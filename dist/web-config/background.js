var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initAuth } from "../logic/auth.js";
import { startParser } from "../logic/start.js";
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (message.action === "AUTH_REQUEST") {
                const success = yield initAuth();
                sendResponse({ success });
            }
            if (message.action === "START_PARSER") {
                const success = yield startParser(message.profiles);
                sendResponse({ success });
            }
        }
        catch (error) {
            console.error("Error in background:", error instanceof Error ? error : "Unknown error");
            sendResponse({ success: false });
        }
    }))();
    return true;
});
//# sourceMappingURL=background.js.map