import { popup } from "../popup.js";
import { sendMessage } from "../services/messages.js";
import { setAuthStatus } from "../store/auth-store.js";

export async function authHandler(): Promise<void> {
  try {
    const response = await sendMessage({ action: "AUTH_REQUEST" });

    await setAuthStatus(true)
    if (response && response.success) {
      popup(true, false);
    }
  } catch (error: unknown) {
    console.error("Error in authHandler:", error instanceof Error ? error : "Unknown error");
  }
}
