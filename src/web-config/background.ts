import { initAuth } from "../logic/auth.js";
import { startParser } from "../logic/start.js";

chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
  (async () => {
    try {
      if (message.action === "AUTH_REQUEST") {
        const success = await initAuth();
        sendResponse({ success }); 
      }
      if (message.action === "START_PARSER") {
        const success = await startParser(message.profiles);
        sendResponse({ success });
      }
    } catch (error: unknown) {
      console.error("Error in background:", error instanceof Error ? error : "Unknown error");
      sendResponse({ success: false });
    }
  })();

  return true;
});
