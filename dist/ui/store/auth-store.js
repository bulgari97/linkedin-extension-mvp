var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { store } from "./store.js";
export function checkAuthStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(["isAuthenticated"], (result) => {
                var _a;
                const isAuthenticated = (_a = result.isAuthenticated) !== null && _a !== void 0 ? _a : false;
                if (store.isAuthenticated !== isAuthenticated) {
                    store.isAuthenticated = isAuthenticated;
                }
                resolve(isAuthenticated);
            });
        });
    });
}
export function setAuthStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        yield chrome.storage.local.set({ isAuthenticated: status });
        if (store.isAuthenticated !== status) {
            store.isAuthenticated = status;
        }
    });
}
//# sourceMappingURL=auth-store.js.map