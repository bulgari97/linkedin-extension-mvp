var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LINKEDIN_COOKIE_NAMES, LINKEDIN_URL } from "../constants/linkedin.consts.js";
export function getLinkedinCookie() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cookieNames = LINKEDIN_COOKIE_NAMES;
            const cookies = [];
            /*
              We request three key cookies (fid, JSESSIONID, li_at) for linkedin authorization.
              They are needed to be sent to the server, where the bot uses them to work with the account.
              The format cookies:
              [
                { "name": "fid", "value": "", "domain": "www.linkedin.com" },
                { "name": "JSESSIONID", "value": "", "domain": ".www.linkedin.com" },
                { "name": "li_at", "value": "", "domain": ".www.linkedin.com" }
              ];
            */
            yield Promise.all(cookieNames.map((name) => new Promise((resolve, reject) => {
                chrome.cookies.get({ url: LINKEDIN_URL, name: name }, (cookie) => {
                    if (chrome.runtime.lastError) {
                        return reject(new Error(chrome.runtime.lastError.message));
                    }
                    if (!cookie) {
                        reject(new Error(`Cookie ${name} is missing`));
                        return;
                    }
                    if (cookie && !cookie.value) {
                        reject(new Error(`Cookie ${name} is empty`));
                        return;
                    }
                    cookies.push({
                        name,
                        value: cookie.value,
                        domain: cookie.domain,
                    });
                    resolve(null);
                });
            })));
            return cookies.length ? cookies : null;
        }
        catch (error) {
            console.error("Error in getLinkedinCookie:", error instanceof Error ? error : "Unknown error");
            return null;
        }
    });
}
export function getSearchUrl() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            var _a;
            if (chrome.runtime.lastError) {
                return reject(new Error(chrome.runtime.lastError.message));
            }
            const url = (_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.url;
            if (!url) {
                console.warn("No active tab URL found");
                return reject();
            }
            /*
              The extension works by passing the URL that the bot will go to parse.
              Either these are people from the search, or profiles from the group
            */
            const isSearch = url.includes(LINKEDIN_URL) && url.includes("/?keywords=");
            const isGroupMembers = url.includes(LINKEDIN_URL) &&
                url.includes("/groups") &&
                url.includes("/members");
            if (!isSearch && !isGroupMembers) {
                console.warn("Must be a LinkedIn search or group members page");
                return reject();
            }
            resolve(url);
        });
    });
}
//# sourceMappingURL=linkedin.js.map