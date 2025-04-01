var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SERVER_GET_TOKEN } from "../constants/api.consts.js";
export function getTokens() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(SERVER_GET_TOKEN, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                console.error(`Request failed: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            if (!data) {
                console.error("Missing tokens in the response");
            }
            return data;
        }
        catch (error) {
            console.error("Error in getTokens:", error instanceof Error ? error : "Unknown error");
            return null;
        }
    });
}
//# sourceMappingURL=get-tokens.js.map