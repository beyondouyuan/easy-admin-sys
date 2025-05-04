import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

import { ElNotification } from 'element-plus'

import { getToken } from '@/hooks/use-token'
import type { IResData } from '@/interfaces/response'

export class Request {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = { baseURL: import.meta.env.VITE_BASE_API, timeout: 60000 }

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.params = {
          ...config.params,
          meta: { start: new Date() },
          token: getToken()
        }

        return config
      },
      (err: any) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data } = res
        if (data.code > 0) {
          // 仅提示，不reject
          ElNotification.error({
            title: 'API Error',
            message: data.msg,
            duration: 5 * 1000
          })
        }
        return data
      },
      (err: any) => {
        let message = ''
        switch (err?.response?.status) {
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            break
          case 403:
            message = '拒绝访问(403)'
            break
          case 404:
            message = '请求出错(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          case 501:
            message = '服务未实现(501)'
            break
          case 502:
            message = '网络错误(502)'
            break
          case 503:
            message = '服务不可用(503)'
            break
          case 504:
            message = '网络超时(504)'
            break
          case 505:
            message = 'HTTP版本不受支持(505)'
            break
          default:
            message = `连接出错(${err.response.status})!`
        }
        ElNotification({
          title: 'Server Error',
          message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(err.response)
      }
    )
  }
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResData<T>> {
    return this.instance.get(url, config)
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResData<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResData<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResData<T>> {
    return this.instance.delete(url, config)
  }
}

// 默认导出Request实例
export default new Request({})
