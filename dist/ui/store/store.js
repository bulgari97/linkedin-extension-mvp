var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const initialState = { isAuthenticated: false, profiles: 50 };
export const store = new Proxy(initialState, {
    set(target, prop, value) {
        if (target[prop] !== value) {
            target[prop] = value;
            document.dispatchEvent(new CustomEvent("storeUpdated", { detail: { prop, value } }));
        }
        return true;
    },
});
export function initStore() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(["isAuthenticated", "profiles"], (result) => {
                var _a, _b;
                store.isAuthenticated = (_a = result.isAuthenticated) !== null && _a !== void 0 ? _a : false;
                store.profiles = (_b = result.profiles) !== null && _b !== void 0 ? _b : 50;
                resolve();
            });
        });
    });
}
//# sourceMappingURL=store.js.map