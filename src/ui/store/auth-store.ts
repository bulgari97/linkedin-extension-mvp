import { store } from "./store.js";

export async function checkAuthStatus(): Promise<boolean> {
    return new Promise((resolve) => {
        chrome.storage.local.get(["isAuthenticated"], (result) => {
            const isAuthenticated: boolean = result.isAuthenticated ?? false;

            if (store.isAuthenticated !== isAuthenticated) {
                store.isAuthenticated = isAuthenticated;
            }
            
            resolve(isAuthenticated);
        });
    });
}

export async function setAuthStatus(status: boolean): Promise<void> {
    await chrome.storage.local.set({ isAuthenticated: status });

    if (store.isAuthenticated !== status) {
        store.isAuthenticated = status;
    }
}
