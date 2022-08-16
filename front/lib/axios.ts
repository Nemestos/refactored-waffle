import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as cookie from 'cookie'
import * as setCookie from 'set-cookie-parser'
import { config } from '../config'
export const proxyClient = axios.create({
  baseURL: `http://localhost:${config.FRONT_PORT}`,
  withCredentials: true
})

createAuthRefreshInterceptor(proxyClient, (failedRequest) =>
  proxyClient.get('/api/refresh').then((resp) => {
    // clear old cookie token
    if (proxyClient.defaults.headers.setCookie) {
      delete proxyClient.defaults.headers.setCookie
    }

    // we get the new token and set it in authorization axios
    const { accessToken } = resp.data
    const bearer = `Bearer ${accessToken}`
    proxyClient.defaults.headers.Authorization = bearer

    // we parse the set cookie and pass it in proxy client
    const responseCookie = setCookie.parse(resp.headers['set-cookie'])[0]
    proxyClient.defaults.headers.setCookie = resp.headers['set-cookie']
    proxyClient.defaults.headers.cookie = cookie.serialize(responseCookie.name, responseCookie.value)

    // we set the bearer token in the failed request for the retry
    failedRequest.response.config.headers.Authorization = bearer

    // retry the request
    return Promise.resolve()
  })
)
