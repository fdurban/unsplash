class UnsplashHandler {
  baseURL: string;
  constructor() {
    this.baseURL = "https://api.unsplash.com/";
  }

  async searchOnUnsplash(searchItem: string) {
    const client_id = import.meta.env.VITE_ACCESS_KEY;

    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${searchItem}&client_id=${client_id}`
    );
    return response.json();
  }
}
const phothoHandler = new UnsplashHandler();

export default phothoHandler;
