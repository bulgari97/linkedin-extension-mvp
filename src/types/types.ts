type IpData = { ip: string };

interface Message {
  action: "AUTH_REQUEST" | "START_PARSER";
  profiles?: number;
}

interface Response {
  success: boolean;
  error?: string;
}

interface Store {
  isAuthenticated: boolean;
  profiles: number;
}

const initialState: Store = { isAuthenticated: false, profiles: 50 };