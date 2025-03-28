use std::collections::HashMap;
use crate::Campaign;
use std::sync::{OnceLock, Mutex, MutexGuard};

// Persistent storage
static STORAGE: OnceLock<Mutex<HashMap<String, Campaign>>> = OnceLock::new();

/// Returns a read-only lock on the storage
pub fn get_storage() -> MutexGuard<'static, HashMap<String, Campaign>> {
    STORAGE.get_or_init(|| Mutex::new(HashMap::new())).lock().expect("Failed to lock storage")
}

/// Returns a mutable lock on the storage
pub fn get_storage_mut() -> MutexGuard<'static, HashMap<String, Campaign>> {
    STORAGE.get_or_init(|| Mutex::new(HashMap::new())).lock().expect("Failed to lock storage")
}
