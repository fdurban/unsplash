import authHandler from "./auth.services";

class UnsplashHandler {
  private baseURL = "https://api.unsplash.com/";
  private unsplashClientId = import.meta.env.VITE_ACCESS_KEY;

  public async searchOnUnsplash(searchItem: string) {
    const response = await fetch(
      `${this.baseURL}search/photos?page=1&query=${searchItem}&client_id=${this.unsplashClientId}`
    );
    return response.json();
  }

  public async searchPhotoId(id: string) {
    const response = await fetch(
      `${this.baseURL}photos/${id}?client_id=${this.unsplashClientId}`
    );
    return response.json();
  }
  public async getUserCollections() {
    const username = authHandler.getUsername();
    console.log("username", username);
    const response = await fetch(
      `${this.baseURL}users/${username}/collections`,
      {
        headers: authHandler.getAuthorizationHeader(),
      }
    );
    return response.json();
  }
}
const photoHandler = new UnsplashHandler();

export default photoHandler;
