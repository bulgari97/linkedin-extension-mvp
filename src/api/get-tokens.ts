import { SERVER_GET_TOKEN } from "../constants/api.consts.js";

export async function getTokens(): Promise<OurCookie[] | null> {
  try {
    const response: Response = await fetch(SERVER_GET_TOKEN, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    const data: OurCookie[] = await response.json();

    if (!data) {
      console.error("Missing tokens in the response");
    }

    return data;
  } catch (error: unknown) {
    console.error("Error in getTokens:", error instanceof Error ? error : "Unknown error");
    return null;
  }
}
