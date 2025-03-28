use ic_cdk_macros::{update, query, init};
use candid::{CandidType, Deserialize};
use serde::Serialize;
use uuid::Uuid;
mod storage;
use storage::{get_storage, get_storage_mut}; // Import only required functions

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
struct Campaign {
    id: String,
    title: String,
    description: String,
    goal: u64,
    raised: u64,
}

#[init]
fn init() {
    ic_cdk::println!("Crowdfunding DApp initialized successfully.");
}

#[update]
fn register_campaign(title: String, description: String, goal: u64) -> String {
    let id = Uuid::new_v4().to_string();
    let campaign = Campaign {
        id: id.clone(),
        title,
        description,
        goal,
        raised: 0,
    };

    let mut storage = get_storage_mut();
    storage.insert(id.clone(), campaign);

    ic_cdk::println!("New campaign registered with ID: {}", id);
    id
}

#[query]
fn get_campaigns() -> Vec<Campaign> {
    let storage = get_storage();
    storage.values().cloned().collect()
}

#[update]
fn fund_campaign(id: String, amount: u64) -> Result<String, String> {
    let mut storage = get_storage_mut();

    match storage.get_mut(&id) {
        Some(campaign) => {
            campaign.raised += amount;
            ic_cdk::println!("Campaign {} funded with {}", id, amount);
            Ok(format!("Successfully funded campaign {} with {}", id, amount))
        }
        None => {
            ic_cdk::println!("Failed to fund: Campaign {} not found", id);
            Err(format!("Campaign with ID {} not found", id))
        }
    }
}
