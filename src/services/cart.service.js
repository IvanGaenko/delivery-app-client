import axios from "axios";

import { apiURL, googleMapsApiKey, recaptchaSecretKey } from "../config";

class CartService {
  static async sendCartData(data) {
    const response = await axios.post(`${apiURL}/cart`, data);
    return response;
  }

  static async getUserCartHistory(data) {
    const response = await axios.post(`${apiURL}/history`, data);
    return response;
  }

  static async getAdressFromLatLng({ lat, lng }) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`;

    const response = await axios.get(url);
    const address = {};
    if (response.data.status === "OK") {
      const { address_components } = response.data.results[0];

      for (let i = 0; i < address_components.length; i++) {
        const { types } = address_components[i];

        for (let j = 0; j < types.length; j++) {
          if (types[j].includes("street_number")) {
            address["street_number"] = address_components[i].short_name;
          }
          if (types[j].includes("route")) {
            address["route"] = address_components[i].short_name;
          }
          if (types[j].includes("locality")) {
            address["locality"] = address_components[i].short_name;
          }
        }
      }
    }

    return address;
  }

  static async getLatLngFromAddress(data) {
    const addressURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      `${data}`
    )}&key=${googleMapsApiKey}`;

    const response = await axios.get(addressURL);
    const address = {};

    if (response.data.status === "OK") {
      const { address_components } = response.data.results[0];

      for (let i = 0; i < address_components.length; i++) {
        const { types } = address_components[i];

        for (let j = 0; j < types.length; j++) {
          if (types[j].includes("street_number")) {
            address["street_number"] = address_components[i].short_name;
          }
          if (types[j].includes("route")) {
            address["route"] = address_components[i].short_name;
          }
          if (types[j].includes("locality")) {
            address["locality"] = address_components[i].short_name;
          }
        }
      }
      return {
        ...response.data.results[0].geometry.location,
        ...address,
      };
    }
    return {
      lat: null,
      lng: null,
      address,
    };
  }

  static async verifyCaptchaToken(token) {
    const response = await axios.post(`${apiURL}/verify-token`, {
      token,
      secretKey: recaptchaSecretKey,
    });
    return response;
  }
}

export default CartService;
