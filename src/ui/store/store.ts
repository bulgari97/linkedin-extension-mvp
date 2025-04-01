const initialState: Store = { isAuthenticated: false, profiles: 50 };

export const store = new Proxy(initialState, {
    set(target: any, prop: keyof Store, value) {
        if (target[prop] !== value) {
            target[prop] = value;
            document.dispatchEvent(new CustomEvent("storeUpdated", { detail: { prop, value } }));
        }
        return true;
    },
});

export async function initStore(): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.local.get(["isAuthenticated", "profiles"], (result) => {
            store.isAuthenticated = result.isAuthenticated ?? false;
            store.profiles = result.profiles ?? 50;
            
            resolve();
        });
    });
}