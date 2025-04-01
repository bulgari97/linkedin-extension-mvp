import { setupErrorLogging } from "../logger/logger.js";
import { setupAmountControls } from "./components/setup-amount.js";
import { getPopupTemplate } from "./components/templates.js";
import { setupEventListeners } from "./events/events.js";
import { authManager } from "./services/auth-manager.js";
import { initStore, store } from "./store/store.js";

/*
  This need for best UI experience. Init is auth value for speed
  Dont touch this without understanding of work authorization
*/
(async () => {
  await initStore();  
  const authStatus: boolean = await authManager();
  popup(authStatus, false);  
})();


/*
  The main function for popup.
  HTML elements in /components/templates
*/
export function popup(isAuthenticated: boolean, parserIsStart: boolean): void {
  const app: HTMLElement | null = document.getElementById("app");
  if (!app) {
    console.error("HTMLElement app is not found. Try later");
    return;
  }

  app.innerHTML = getPopupTemplate(isAuthenticated, parserIsStart)

  /*
    Re-installing event handlers, as innerHTML removes them
  */
  setupEventListeners();
  setupAmountControls();
  setupErrorLogging();
}


