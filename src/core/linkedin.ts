import { LINKEDIN_COOKIE_NAMES, LINKEDIN_URL } from "../constants/linkedin.consts.js";

export async function getLinkedinCookie(): Promise<LinkedInCookie[] | null> {
  try {
    const cookieNames = LINKEDIN_COOKIE_NAMES;
    const cookies: LinkedInCookie[] = [];

    /*
      We request three key cookies (fid, JSESSIONID, li_at) for linkedin authorization.  
      They are needed to be sent to the server, where the bot uses them to work with the account. 
      The format cookies:
      [
        { "name": "fid", "value": "", "domain": "www.linkedin.com" },
        { "name": "JSESSIONID", "value": "", "domain": ".www.linkedin.com" },
        { "name": "li_at", "value": "", "domain": ".www.linkedin.com" }
      ];
    */

    await Promise.all(
      cookieNames.map(
        (name) =>
          new Promise((resolve, reject) => {
            chrome.cookies.get({ url: LINKEDIN_URL, name: name }, (cookie) => {
              if (chrome.runtime.lastError) {
                return reject(new Error(chrome.runtime.lastError.message));
              }

              if (!cookie) {
                reject(new Error(`Cookie ${name} is missing`));
                return;
              }

              if (cookie && !cookie.value) {
                reject(new Error(`Cookie ${name} is empty`));
                return;
              }

              cookies.push({
                name,
                value: cookie.value,
                domain: cookie.domain,
              });

              resolve(null);
            });
          })
      )
    );

    return cookies.length ? cookies : null;
  } catch (error) {
    console.error("Error in getLinkedinCookie:", error instanceof Error ? error : "Unknown error");
    return null;
  }
}

export function getSearchUrl(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        return reject(new Error(chrome.runtime.lastError.message));
      }

      const url = tabs[0]?.url;

      if (!url) {
        console.warn("No active tab URL found");
        return reject();
      }

      /*
        The extension works by passing the URL that the bot will go to parse. 
        Either these are people from the search, or profiles from the group
      */

      const isSearch: boolean =
        url.includes(LINKEDIN_URL) && url.includes("/?keywords=");
      const isGroupMembers: boolean =
        url.includes(LINKEDIN_URL) &&
        url.includes("/groups") &&
        url.includes("/members");

      if (!isSearch && !isGroupMembers) {
        console.warn("Must be a LinkedIn search or group members page");
        return reject();
      }

      resolve(url);
    });
  });
}
