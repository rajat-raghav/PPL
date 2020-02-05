import { SERVER_URL } from "./Config";
import axios from "axios";

const getData = (route, data = "") => {
  return axios.post(SERVER_URL + route, data);
};
export default getData;
