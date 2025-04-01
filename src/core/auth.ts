import { OUR_COOKIE_NAMES, SERVER_URL } from "../constants/api.consts.js";

export async function getOurCookie(): Promise<OurCookie[]> {
  try {
    const cookieNames = OUR_COOKIE_NAMES;
    const cookies: OurCookie[] = [];

    await Promise.all(
      cookieNames.map(
        (name) =>
          new Promise((resolve, reject) => {
            chrome.cookies.get({ url: SERVER_URL, name: name }, (cookie) => {
              if (!cookie) {
                console.warn(`Cookie ${name} is missing`);
                return resolve(null);
              }

              if (cookie && !cookie.value) {
                console.warn(`Cookie ${name} is empty`);
                return resolve(null);
              }

              cookies.push({
                name,
                value: cookie.value,
              });

              resolve(null);
            });
          })
      )
    )

    if(!cookies.length) {
      console.error("Cookies not found. Try later")
    }
      
    return cookies
  } catch (error) {
    console.error("Error in getOurCookie:", error instanceof Error ? error : "Unknown error");
    return [];
  }
}

export async function setOurCookie(cookies: OurCookie[]): Promise<boolean> {
  try {
    await Promise.all(
      cookies.map(({ name, value }) =>
        new Promise<void>((resolve, reject) => {
          chrome.cookies.set(
            {
              url: SERVER_URL,
              name,
              value,
              path: "/",
              httpOnly: true,
              secure: true,
            },
            () => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            }
          );
        })
      )
    );

    return true
  } catch (error) {
    console.error("Error in setOurCookie:", error instanceof Error ? error : "Unknown error");
    return false
  }
}

