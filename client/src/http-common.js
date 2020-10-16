import axios from "axios";

export default axios.create({
  baseURL: "https://restaurant-api-class.uc.r.appspot.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
