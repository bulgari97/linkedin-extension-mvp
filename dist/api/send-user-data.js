var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SERVER_DATA_URL } from "../constants/api.consts.js";
export function sendUserData(cookie, ip, ua, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!Array.isArray(cookie) || cookie.length === 0) {
                console.error("Cookie array must not be empty.");
            }
            /*
              Use this only in DEV mode. Dont show this to UI
              This is not must values
        
              if (!ip?.trim()) {
                console.error("IP address must not be empty.");
              }
              if (!ua?.trim()) {
                console.error("User-Agent must not be empty.");
              }
              if (!lang?.trim()) {
                console.error("Language must not be empty.");
              }
            */
            const response = yield fetch(SERVER_DATA_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cookie, ip, ua, lang }),
            });
            if (!response.ok) {
                console.error(`Request failed: ${response.status} ${response.statusText}`);
            }
        }
        catch (error) {
            console.error("Error in sendUserData:", error instanceof Error ? error : "Unknown error");
        }
    });
}
//# sourceMappingURL=send-user-data.js.map