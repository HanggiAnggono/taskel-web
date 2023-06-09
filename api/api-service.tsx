import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

export const API_BASE_URL = process.env.API_BASE_URL
export const axiosNoAuth = axios.create()

export const axiosAuth = axios.create()

export const axiosServer = axios.create({ baseURL: API_BASE_URL })
axiosServer.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  return config
})

axiosServer.interceptors.response.use((response) => {
  return response
})

export const useApiNoAuth = makeUseAxios({ axios: axiosNoAuth })
export const useApi = makeUseAxios({ axios: axiosAuth })
