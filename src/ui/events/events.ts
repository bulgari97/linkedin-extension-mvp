import { initButtons } from "../components/buttons.js";
import { authHandler } from "../handlers/auth-handler.js";
import { parserHandler } from "../handlers/parser-handler.js";

export function setupEventListeners(): void {
  const { authBtn, startParserBtn } = initButtons();

  authBtn?.addEventListener("click", authHandler);
  startParserBtn?.addEventListener("click", () => parserHandler());
}
