import { GET_IP_URL } from "../constants/services.consts.js";

export async function getIp(): Promise<string | null> {
  try {
    const res: Response = await fetch(GET_IP_URL);

    if (!res.ok)
      console.error(`Failed to fetch IP: ${res.status} ${res.statusText}`);

    const data: IpData = await res.json();

    return data.ip as string;
  } catch (error: unknown) {
    console.error("Error in getIp:", error instanceof Error ? error : "Unknown error");
    return null;
  }
}

export function getUserAgent(): string {
  const ua = navigator.userAgent as string;

  if (!ua) console.error("Failed get User Agent");

  return ua;
}

export function getLang(): string {
  const lang = navigator.language as string;

  if (!lang) console.error("Failed get User Language");

  return lang;
}
