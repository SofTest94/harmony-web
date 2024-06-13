import axios from 'axios';

// const URL_BASE = 'https://api-harmony-9de1cc5a5fa1.herokuapp.com/';
const URL_BASE = 'https://dev-harmony-a2e52e71ba6c.herokuapp.com/';


const HarmonyApi = axios.create({
  baseURL: URL_BASE,
});

export default HarmonyApi;
