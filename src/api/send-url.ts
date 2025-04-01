import { SERVER_SEARCH_URL } from "../constants/api.consts.js";

export async function sendLinkedinSearch (
  cookies: OurCookie[],
  profiles: number,
  search: string
): Promise<void> {
  try {
    if (!Number.isInteger(profiles) || profiles <= 0) {
      console.error("The number of profiles must be a positive integer.");
    }
    if (!search.trim()) {
      console.error("The search query must not be empty.");
    }

    const response: Response = await fetch(SERVER_SEARCH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cookies, profiles, search }),
    });

    if (!response.ok) {
      console.error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }
  } catch (error: unknown) {
    console.error("Error in sendLinkedinSearch:", error instanceof Error ? error : "Unknown error");
  }
};
