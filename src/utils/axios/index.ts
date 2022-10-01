import Axios from './Axios'
const http = new Axios({
  baseURL: '/api',
  timeout: 100000,
  withCredentials: true, //携带本地凭据 比如cookie
})
export { http }
