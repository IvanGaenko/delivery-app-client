import axios from "axios";

import { apiURL } from "../config";

class ShopService {
  static async getProductList() {
    const response = await axios.get(`${apiURL}/shop`);
    return response;
  }
}

export default ShopService;
