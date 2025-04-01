import { initButtons } from "../components/buttons.js";
import { authHandler } from "../handlers/auth-handler.js";
import { parserHandler } from "../handlers/parser-handler.js";
export function setupEventListeners() {
    const { authBtn, startParserBtn } = initButtons();
    authBtn === null || authBtn === void 0 ? void 0 : authBtn.addEventListener("click", authHandler);
    startParserBtn === null || startParserBtn === void 0 ? void 0 : startParserBtn.addEventListener("click", () => parserHandler());
}
//# sourceMappingURL=events.js.map