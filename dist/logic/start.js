var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendLinkedinSearch } from "../api/send-url.js";
import { getOurCookie } from "../core/auth.js";
import { getSearchUrl } from "../core/linkedin.js";
import { checkAuth } from "./auth.js";
/*
  !!!DONT TOUCH ANYTHING HERE WITHOUT UNDERSTANDING ARCHITECURE!!!
*/
export function startParser() {
    return __awaiter(this, arguments, void 0, function* (profiles = 50) {
        try {
            const isAuth = yield checkAuth();
            if (!isAuth) {
                console.warn("Please check your linkedin authorization or try again");
                return false;
            }
            const cookies = yield getOurCookie();
            if (cookies == null) {
                console.warn("Please check your linkedin authorization or try again");
                return false;
            }
            const search = yield getSearchUrl();
            yield sendLinkedinSearch(cookies, profiles, search);
            return true;
        }
        catch (error) {
            console.error("Error in startParser:", error instanceof Error ? error : "Unknown error");
            return false;
        }
    });
}
//# sourceMappingURL=start.js.map