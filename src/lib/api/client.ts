import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com'

export const api = axios.create({
  baseURL,
  timeout: 10_000,
})

api.interceptors.request.use(
  (config) => {
    const method = config.method?.toUpperCase()
    console.log(`[api] ${method} ${config.baseURL}${config.url}`)
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => {
    console.log(`[api] ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message ??
      'Request failed'

    console.error('[api] request failed', {
      status: error.response?.status,
      url: error.config?.url,
      message,
    })

    return Promise.reject(new Error(message))
  },
)
