import axios from "axios";

class UnsplashHandler {
  baseURL: string;
  constructor() {
    this.baseURL = "https://api.unsplash.com/search/photos";
  }

  async searchOnUnsplash(searchItem: string) {
    const client_id = "yBqSXnlnFm-ygmSjxFP9FXwU-XUIldRmmfPhTOcBbhE";
    const params = {
      client_id: client_id,
      search: searchItem,
    };
    const response = await axios.get(this.baseURL, {
      params: {
        ...params,
        origin: "*",
      },
    });
    return response.data;
  }
}

export default UnsplashHandler;
