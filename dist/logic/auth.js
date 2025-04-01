var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getTokens } from "../api/get-tokens.js";
import { sendUserData } from "../api/send-user-data.js";
import { OUR_COOKIE_NAMES } from "../constants/api.consts.js";
import { LINKEDIN_COOKIE_NAMES } from "../constants/linkedin.consts.js";
import { getOurCookie, setOurCookie } from "../core/auth.js";
import { getIp, getLang, getUserAgent } from "../core/browser.js";
import { getLinkedinCookie } from "../core/linkedin.js";
export function initAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isAuth = yield checkAuth();
            if (!isAuth) {
                const authIsSuccess = yield auth();
                if (!authIsSuccess) {
                    console.error("Problem with authentication. Please, try again or reinstall our app");
                    return false;
                }
                return true;
            }
            return true;
        }
        catch (error) {
            console.error("Error in initAuth:", error instanceof Error ? error : "Unknown error");
            return false;
        }
    });
}
export function auth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const linkedinCookies = yield getLinkedinCookie();
            if ((linkedinCookies === null || linkedinCookies === void 0 ? void 0 : linkedinCookies.length) !== LINKEDIN_COOKIE_NAMES.length) {
                console.warn("You are not authorizated in linkedin");
                return false;
            }
            const ip = yield getIp();
            const userAgent = getUserAgent();
            const lang = getLang();
            yield sendUserData(linkedinCookies, ip, userAgent, lang);
            const authTokens = yield getTokens();
            if ((authTokens === null || authTokens === void 0 ? void 0 : authTokens.length) !== OUR_COOKIE_NAMES.length) {
                console.warn("You are not authorizated in linkedin");
                return false;
            }
            const isSuccess = yield setOurCookie(authTokens);
            if (!isSuccess) {
                console.warn("Problem with setOurCookie");
                return false;
            }
            return true;
        }
        catch (error) {
            console.error("Error in auth:", error instanceof Error ? error : "Unknown error");
            return false;
        }
    });
}
export function checkAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkAuth = yield getOurCookie();
            const checkLinkedinAuth = yield getLinkedinCookie();
            return ((checkAuth === null || checkAuth === void 0 ? void 0 : checkAuth.length) === OUR_COOKIE_NAMES.length && (checkLinkedinAuth === null || checkLinkedinAuth === void 0 ? void 0 : checkLinkedinAuth.length) === LINKEDIN_COOKIE_NAMES.length);
        }
        catch (error) {
            console.error("Error in checkAuth:", error instanceof Error ? error : "Unknown error");
            return false;
        }
    });
}
//# sourceMappingURL=auth.js.map