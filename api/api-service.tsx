import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

const API_BASE_URL = 'http://localhost:8080'
export const axiosNoAuth = axios.create()

export const axiosAuth = axios.create()

export const axiosServer = axios.create({baseURL: API_BASE_URL})

export const useApiNoAuth = makeUseAxios({ axios: axiosNoAuth })
export const useApi = makeUseAxios({ axios: axiosAuth })
