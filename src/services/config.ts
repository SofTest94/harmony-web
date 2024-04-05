import axios from 'axios';

const URL_BASE = process.env.API_URL_BASE;

const MediclarApi = axios.create({
  baseURL: URL_BASE,
});

export default MediclarApi;
