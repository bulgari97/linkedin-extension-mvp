var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setupErrorLogging } from "../logger/logger.js";
import { setupAmountControls } from "./components/setup-amount.js";
import { getPopupTemplate } from "./components/templates.js";
import { setupEventListeners } from "./events/events.js";
import { authManager } from "./services/auth-manager.js";
import { initStore } from "./store/store.js";
/*
  This need for best UI experience. Init is auth value for speed
  Dont touch this without understanding of work authorization
*/
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield initStore();
    const authStatus = yield authManager();
    popup(authStatus, false);
}))();
/*
  The main function for popup.
  HTML elements in /components/templates
*/
export function popup(isAuthenticated, parserIsStart) {
    const app = document.getElementById("app");
    if (!app) {
        console.error("HTMLElement app is not found. Try later");
        return;
    }
    app.innerHTML = getPopupTemplate(isAuthenticated, parserIsStart);
    /*
      Re-installing event handlers, as innerHTML removes them
    */
    setupEventListeners();
    setupAmountControls();
    setupErrorLogging();
}
//# sourceMappingURL=popup.js.map