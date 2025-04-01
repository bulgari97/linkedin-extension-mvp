var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SERVER_SEARCH_URL } from "../constants/api.consts.js";
export function sendLinkedinSearch(cookies, profiles, search) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!Number.isInteger(profiles) || profiles <= 0) {
                console.error("The number of profiles must be a positive integer.");
            }
            if (!search.trim()) {
                console.error("The search query must not be empty.");
            }
            const response = yield fetch(SERVER_SEARCH_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cookies, profiles, search }),
            });
            if (!response.ok) {
                console.error(`Request failed: ${response.status} ${response.statusText}`);
            }
        }
        catch (error) {
            console.error("Error in sendLinkedinSearch:", error instanceof Error ? error : "Unknown error");
        }
    });
}
;
//# sourceMappingURL=send-url.js.map