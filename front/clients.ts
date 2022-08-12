import axios from 'axios'
import { config } from './config'

export const apiClient = axios.create({
  baseURL: `${config.API_HOST}/${config.API_PORT}`,
  headers: {
    'Content-Type': 'application/json'
  }
})
