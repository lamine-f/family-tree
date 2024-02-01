import axios from 'axios';

export const imgInstance = axios.create({ baseURL: 'https://reqres.in/' });
export const gitInstance = axios.create({ baseURL: 'https://gist.githubusercontent.com/' });
export const backend = axios.create({ baseURL: 'http://phv.servehttp.com:9001/' });
// export const backend = axios.create({ baseURL: 'http://localhost:8080/' });

