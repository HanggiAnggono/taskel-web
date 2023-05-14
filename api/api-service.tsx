import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

const API_BASE_URL = 'http://localhost:8080'
const axiosNoAuth = axios.create({
  baseURL: API_BASE_URL,
})

const axiosAuth = axios.create({
  baseURL: API_BASE_URL,
})

export const useApiNoAuth = makeUseAxios({ axios: axiosNoAuth })
export const usApi = makeUseAxios({ axios: axiosAuth })
