import axios from 'axios';

const URL_BASE = 'https://api-harmony-9de1cc5a5fa1.herokuapp.com/';

const HarmonyApi = axios.create({
  baseURL: URL_BASE,
});

export default HarmonyApi;
