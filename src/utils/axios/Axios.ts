import axios, { AxiosRequestConfig } from 'axios'
import { createBrowserHistory } from 'history'
let history = createBrowserHistory()
export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }

  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
  public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  private interceptorsRequest() {
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      config => {
        // 在发送请求之前做些什么
        let token = JSON.parse(localStorage.getItem('qf-token') as string)
        config.headers!.authorization = token
        return config
      },
      error => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )
  }
  private interceptorsResponse() {
    // 添加响应拦截器
    this.instance.interceptors.response.use((config: AxiosRequestConfig<Member>) => {
      let { code } = config.data!
      if (code === '10022' || code === '1004') {
        // Message.error('登入过期,请重新登入')
        localStorage.removeItem('qf-token')
        history.push('/login')
        window.location.reload()
      }
      return config
    })
  }
}
