var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { popup } from "../popup.js";
import { sendMessage } from "../services/messages.js";
import { setAuthStatus } from "../store/auth-store.js";
export function authHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield sendMessage({ action: "AUTH_REQUEST" });
            yield setAuthStatus(true);
            if (response && response.success) {
                popup(true, false);
            }
        }
        catch (error) {
            console.error("Error in authHandler:", error instanceof Error ? error : "Unknown error");
        }
    });
}
//# sourceMappingURL=auth-handler.js.map