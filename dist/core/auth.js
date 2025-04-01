var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OUR_COOKIE_NAMES, SERVER_URL } from "../constants/api.consts.js";
export function getOurCookie() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cookieNames = OUR_COOKIE_NAMES;
            const cookies = [];
            yield Promise.all(cookieNames.map((name) => new Promise((resolve, reject) => {
                chrome.cookies.get({ url: SERVER_URL, name: name }, (cookie) => {
                    if (!cookie) {
                        console.warn(`Cookie ${name} is missing`);
                        return resolve(null);
                    }
                    if (cookie && !cookie.value) {
                        console.warn(`Cookie ${name} is empty`);
                        return resolve(null);
                    }
                    cookies.push({
                        name,
                        value: cookie.value,
                    });
                    resolve(null);
                });
            })));
            if (!cookies.length) {
                console.error("Cookies not found. Try later");
            }
            return cookies;
        }
        catch (error) {
            console.error("Error in getOurCookie:", error instanceof Error ? error : "Unknown error");
            return [];
        }
    });
}
export function setOurCookie(cookies) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all(cookies.map(({ name, value }) => new Promise((resolve, reject) => {
                chrome.cookies.set({
                    url: SERVER_URL,
                    name,
                    value,
                    path: "/",
                    // httpOnly: true,
                    // secure: true,
                }, () => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    }
                    else {
                        resolve();
                    }
                });
            })));
            return true;
        }
        catch (error) {
            console.error("Error in setOurCookie:", error instanceof Error ? error : "Unknown error");
            return false;
        }
    });
}
//# sourceMappingURL=auth.js.map