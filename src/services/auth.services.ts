import axios from "axios";

class AuthService {
  private baseURL = "https://unsplash.com/";
  private unsplashClientId = import.meta.env.VITE_ACCESS_KEY;
  private unsplashClientSecret = import.meta.env.VITE_CLIENT_SECRET;
  private token: string | null = null;
  private username: string | null = null;

  constructor() {
    // Load token from localStorage during AuthService initialization
    this.token = localStorage.getItem("accessToken") || null;
    this.username = localStorage.getItem("username") || null;
  }

  public async exchangeCodeForToken(code: string): Promise<string> {
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;

    try {
      const tokenResponse = await axios.post(`${this.baseURL}oauth/token`, {
        client_id: this.unsplashClientId,
        client_secret: this.unsplashClientSecret,
        redirect_uri: redirectUri,
        code,
        grant_type: "authorization_code",
      });

      this.setToken(tokenResponse.data.access_token);
      this.setUsername(tokenResponse.data.username);
      localStorage.setItem("authToken", tokenResponse.data.access_token);
      localStorage.setItem("username", tokenResponse.data.username);
      const accessData = tokenResponse.data;
      return accessData;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw new Error("Unable to exchange code for token");
    }
  }

  private setToken(token: string): void {
    this.token = token;
  }
  private setUsername(username: string): void {
    this.username = username;
  }

  public getUsername(): string | null {
    return this.username;
  }

  public getAuthorizationHeader(): { Authorization: string } | object {
    const localStorageToken = localStorage.getItem("authToken");

    if (localStorageToken) {
      // Set the token in the class state
      this.setToken(localStorageToken);

      return { Authorization: `Bearer ${localStorageToken}` };
    }

    return {};
  }
}

const authHandler = new AuthService();
export default authHandler;
