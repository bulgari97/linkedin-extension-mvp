var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkAuth } from "../../logic/auth.js";
import { initButtons } from "../components/buttons.js";
import { popup } from "../popup.js";
import { sendMessage } from "../services/messages.js";
import { setAuthStatus } from "../store/auth-store.js";
export function parserHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const freshAuth = yield checkAuth();
            const { profileCountInput } = initButtons();
            if (!freshAuth) {
                yield setAuthStatus(false);
                popup(false, false);
                console.warn("Please try relogin in LinkedIn");
                return;
            }
            if (!profileCountInput) {
                console.warn("profileCountInput not found");
                return;
            }
            const profileCount = Number((_a = profileCountInput.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || 50;
            const response = yield sendMessage({ action: "START_PARSER", profiles: profileCount });
            if (response.success) {
                popup(true, true);
            }
        }
        catch (error) {
            console.error("Error in parserHandler:", error instanceof Error ? error : "Unknown error");
        }
    });
}
//# sourceMappingURL=parser-handler.js.map