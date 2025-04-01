import { checkAuth, initAuth } from "../../logic/auth.js";
import { popup } from "../popup.js";
import { checkAuthStatus, setAuthStatus } from "../store/auth-store.js";

/*
  !!!DONT TOUCH ANYTHING HERE WITHOUT UNDERSTANDING ARCHITECURE!!!
*/

export async function authManager(): Promise<boolean> {
  try {
    const isAuth: boolean = await checkAuthStatus();

    popup(isAuth, false);

    const freshAuth: boolean = await checkAuth();

    if (freshAuth !== isAuth || freshAuth == false) {
      const authSuccess = await initAuth();

      if(authSuccess) {
        popup(true, false);

        await setAuthStatus(true);
  
        return true;
      }

     console.error("Problem with auth in authManager. Try later")
     return false
    }

    return true;
  } catch (error: unknown) {
    console.error("Error in authManager:", error instanceof Error ? error : "Unknown error");
    return false;
  }
}
