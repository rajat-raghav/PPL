import { SERVER_URL } from '../Config';
import axios from 'axios';


export default function api(route, data = '') {
  return axios.post(SERVER_URL + route, data);
}


