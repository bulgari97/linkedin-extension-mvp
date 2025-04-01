import { checkAuth } from "../../logic/auth.js";
import { initButtons } from "../components/buttons.js";
import { popup } from "../popup.js";
import { sendMessage } from "../services/messages.js";
import { setAuthStatus } from "../store/auth-store.js";

export async function parserHandler() {
  try {
    const freshAuth: boolean = await checkAuth();
    const { profileCountInput } = initButtons();
  
    if (!freshAuth) {
      await setAuthStatus(false)
      popup(false, false)
      console.warn("Please try relogin in LinkedIn");
      return;
    }
  
    if (!profileCountInput) {
      console.warn("profileCountInput not found");
      return;
    }
  
    const profileCount: number = Number(profileCountInput.textContent?.trim()) || 50;  

    const response = await sendMessage({ action: "START_PARSER", profiles: profileCount });

    if (response.success) {
      popup(true, true);
    } 
  } catch (error: unknown) {
    console.error("Error in parserHandler:", error instanceof Error ? error : "Unknown error");
  }
}
