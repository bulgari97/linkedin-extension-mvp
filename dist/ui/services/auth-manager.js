var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkAuth, initAuth } from "../../logic/auth.js";
import { popup } from "../popup.js";
import { checkAuthStatus, setAuthStatus } from "../store/auth-store.js";
/*
  !!!DONT TOUCH ANYTHING HERE WITHOUT UNDERSTANDING ARCHITECURE!!!
*/
export function authManager() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isAuth = yield checkAuthStatus();
            popup(isAuth, false);
            const freshAuth = yield checkAuth();
            if (freshAuth !== isAuth || freshAuth == false) {
                const authSuccess = yield initAuth();
                if (authSuccess) {
                    popup(true, false);
                    yield setAuthStatus(true);
                    return true;
                }
                console.error("Problem with auth in authManager. Try later");
                return false;
            }
            return true;
        }
        catch (error) {
            console.error("Error in authManager:", error instanceof Error ? error : "Unknown error");
            return false;
        }
    });
}
//# sourceMappingURL=auth-manager.js.map