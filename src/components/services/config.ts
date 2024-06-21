import axios from 'axios';

// const URL_BASE = 'https://api-harmony-9de1cc5a5fa1.herokuapp.com/'; esta es la mia pero ya se me vencio el pago
// const URL_BASE = 'https://dev-harmony-a2e52e71ba6c.herokuapp.com/';// esta es de brandon pero no puedo entrar a agregar los nuevos endpoint
const URL_BASE = 'https://harmony-dev-mob-58cd4e713b6a.herokuapp.com/';// esta es de orozco para poder avanzar con el MVP2

const HarmonyApi = axios.create({
  baseURL: URL_BASE,
});

export default HarmonyApi;
