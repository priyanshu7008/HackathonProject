import { AuthClient } from "@dfinity/auth-client";
import { idlFactory } from "../../../declarations/crowdfunding-dapp-backend";
import { Actor, HttpAgent } from "@dfinity/agent";


// Ensure correct environment variable handling for Vite
const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;
if (!canisterId) {
    console.error("Error: Backend Canister ID is missing from environment variables.");
} else {
    console.log("Using Canister ID:", canisterId);
}

const agent = new HttpAgent();
const crowdfunding_dapp_backend = Actor.createActor(idlFactory, { agent, canisterId });

// Log available backend functions
console.log("Available Backend Functions:", Object.keys(crowdfunding_dapp_backend));

export async function loginWithII() {
    try {
        const authClient = await AuthClient.create();
        await authClient.login({
            identityProvider: "https://identity.ic0.app",
        });
        return authClient.isAuthenticated();
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
}

export async function register_campaign(title: unknown, description: unknown, goal: string | number | bigint | boolean) {
    try {
        return await crowdfunding_dapp_backend.register_campaign(title, description, BigInt(goal));
    } catch (error) {
        console.error("Error registering campaign:", error);
        throw error;
    }
}

export async function get_campaigns() {
    try {
        return await crowdfunding_dapp_backend.get_campaigns();
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        throw error;
    }
}

export async function fund_campaign(id: unknown, amount: string | number | bigint | boolean) {
    try {
        return await crowdfunding_dapp_backend.fund_campaign(id, BigInt(amount));
    } catch (error) {
        console.error("Error funding campaign:", error);
        throw error;
    }
}

export { crowdfunding_dapp_backend };
