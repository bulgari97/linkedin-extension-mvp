import { sendLinkedinSearch } from "../api/send-url.js";
import { getOurCookie } from "../core/auth.js";
import { getSearchUrl } from "../core/linkedin.js";
import { checkAuth } from "./auth.js";

/*
  !!!DONT TOUCH ANYTHING HERE WITHOUT UNDERSTANDING ARCHITECURE!!!
*/

export async function startParser(profiles: number = 50): Promise<boolean> {
  try {
    const isAuth: boolean = await checkAuth();
    if (!isAuth) {
      console.warn("Please check your linkedin authorization or try again");
      return false;
    }

    const cookies: OurCookie[] | null = await getOurCookie();

    if (cookies == null) {
      console.warn("Please check your linkedin authorization or try again");
      return false;
    }

    const search: string = await getSearchUrl();

    await sendLinkedinSearch(cookies, profiles, search);

    return true
  } catch (error: unknown) {
    console.error("Error in startParser:", error instanceof Error ? error : "Unknown error");
    return false
  }
}
