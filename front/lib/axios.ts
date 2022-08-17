import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as setCookie from 'set-cookie-parser'
import { config } from '../config'
export const proxyClient = axios.create({
  baseURL: `http://localhost:${config.FRONT_PORT}`,
  withCredentials: true
})

createAuthRefreshInterceptor(proxyClient, (failedRequest) =>
  // 1. First try request fails - refresh the token.
  proxyClient.get('/api/refresh').then((resp) => {
    // 1a. Clear old helper cookie used in 'authorize.ts' higher order function.
    if (proxyClient.defaults.headers.setCookie) {
      delete proxyClient.defaults.headers.setCookie
    }
    const { accessToken, refreshToken } = resp.data
    // 2. Set up new access token
    const bearer = `Bearer ${accessToken}`

    proxyClient.defaults.headers.Authorization = bearer

    // 3. Set up new refresh token as cookie
    const responseCookie = setCookie.parse(refreshToken)[0] // 3a. We can't just acces it, we need to parse it first.
    proxyClient.defaults.headers.setCookie = refreshToken // 3b. Set helper cookie for 'authorize.ts' Higher order Function.

    // proxyClient.defaults.headers.cookie = cookie.serialize(responseCookie.name, responseCookie.value)

    // 4. Set up access token of the failed request.
    failedRequest.response.config.headers.Authorization = bearer

    // 5. Retry the request with new setup!
    return Promise.resolve()
  })
)
