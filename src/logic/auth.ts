import { getTokens } from "../api/get-tokens.js";
import { sendUserData } from "../api/send-user-data.js";
import { OUR_COOKIE_NAMES } from "../constants/api.consts.js";
import { LINKEDIN_COOKIE_NAMES } from "../constants/linkedin.consts.js";
import { getOurCookie, setOurCookie } from "../core/auth.js";
import { getIp, getLang, getUserAgent } from "../core/browser.js";
import { getLinkedinCookie } from "../core/linkedin.js";

export async function initAuth(): Promise<boolean> {
  try {
    const isAuth: boolean = await checkAuth();

    if (!isAuth) {
      const authIsSuccess: boolean = await auth();

      if (!authIsSuccess) {
        console.error(
          "Problem with authentication. Please, try again or reinstall our app"
        );

        return false;
      }

      return true;
    }

    return true;
  } catch (error: unknown) {
    console.error("Error in initAuth:", error instanceof Error ? error : "Unknown error");
    return false;
  }
}

export async function auth(): Promise<boolean> {
  try {

    const linkedinCookies: LinkedInCookie[] | null = await getLinkedinCookie();

    if (linkedinCookies?.length !== LINKEDIN_COOKIE_NAMES.length) {
      console.warn("You are not authorizated in linkedin");
      return false;
    }

    const ip: string | null = await getIp();
    const userAgent: string = getUserAgent();
    const lang: string = getLang();

    await sendUserData(linkedinCookies, ip, userAgent, lang);

    const authTokens: OurCookie[] | null = await getTokens();

    if (authTokens?.length !== OUR_COOKIE_NAMES.length) {
      console.warn("You are not authorizated in linkedin");
      return false;
    }

    const isSuccess = await setOurCookie(authTokens);

    if(!isSuccess) {
      console.warn("Problem with setOurCookie")
      return false
    }

    return true;
  } catch (error: unknown) {
    console.error("Error in auth:", error instanceof Error ? error : "Unknown error");
    return false;
  }
}

export async function checkAuth(): Promise<boolean> {
  try {
    const checkAuth: OurCookie[] | null = await getOurCookie();

    const checkLinkedinAuth: LinkedInCookie[] | null = await getLinkedinCookie();

    return (checkAuth?.length === OUR_COOKIE_NAMES.length && checkLinkedinAuth?.length === LINKEDIN_COOKIE_NAMES.length);
  } catch (error: unknown) {
    console.error("Error in checkAuth:", error instanceof Error ? error : "Unknown error");
    return false;
  }
}
