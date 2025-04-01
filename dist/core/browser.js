var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GET_IP_URL } from "../constants/services.consts.js";
export function getIp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(GET_IP_URL);
            if (!res.ok)
                console.error(`Failed to fetch IP: ${res.status} ${res.statusText}`);
            const data = yield res.json();
            return data.ip;
        }
        catch (error) {
            console.error("Error in getIp:", error instanceof Error ? error : "Unknown error");
            return null;
        }
    });
}
export function getUserAgent() {
    const ua = navigator.userAgent;
    if (!ua)
        console.error("Failed get User Agent");
    return ua;
}
export function getLang() {
    const lang = navigator.language;
    if (!lang)
        console.error("Failed get User Language");
    return lang;
}
//# sourceMappingURL=browser.js.map