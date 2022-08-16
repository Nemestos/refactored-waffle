import { AnyAction, Store } from '@reduxjs/toolkit'
import axios from 'axios'
import * as cookie from 'cookie'
import { ServerResponse } from 'http'
import { GetServerSidePropsContext } from 'next'
import * as setCookie from 'set-cookie-parser'
import { IRefreshResponse } from '../types/auth.types'
import { reset, updateAccessToken } from './slices/auth'
import { MyThunkDispatch, OurStore } from './store'

// make a type with the context of next request and the store
export type ContextWithStore = Omit<
  GetServerSidePropsContext & {
    store: Store<OurStore, AnyAction>
  },
  'resolveUrl'
>

export type Callback = (
  accessToken: string,
  store: Store<OurStore, AnyAction>,
  res: ServerResponse
) => Record<string, unknown> | Promise<Record<string, unknown>>

interface AuthorizeProps {
  context: ContextWithStore
  callback: Callback
}

export const authorize = async ({ context, callback }: AuthorizeProps) => {
  const { store, req, res } = context
  const { dispatch }: { dispatch: MyThunkDispatch } = store
  const { accessToken } = store.getState().authReducer

  if (req) {
    // transfer cookie from client to server side
    axios.defaults.headers.cookie = req.headers.cookie || null
    if (accessToken) axios.defaults.headers.Authorization = `Bearer ${accessToken}`
    if (!accessToken) {
      try {
        // we get a new access and refresh and update cookie from headers
        const resp = await axios.get<IRefreshResponse>('/api/refresh')
        const newAccess = resp.data.accessToken
        const respCookie = setCookie.parse(resp.headers['set-cookie'])[0]
        axios.defaults.headers.cookie = cookie.serialize(respCookie.name, respCookie.value)
        axios.defaults.headers.Authorization = `Bearer ${newAccess}`
        res.setHeader('set-cookie', resp.headers['set-cookie'])

        // update the store
        dispatch(updateAccessToken({ token: newAccess }))
      } catch (error) {
        // reset if error
        store.dispatch(reset())
        return null
      }
    }
    // we have a valid access token so we can get the appropriate resource
    try {
      const cbResp = await callback(accessToken, store, res)
      // if the refresh would be updated
      if (axios.defaults.headers.setCookie) {
        res.setHeader('set-cookie', axios.defaults.headers.setCookie)
        const newToken = axios.defaults.headers.Authorization.split(' ')[1]
        dispatch(updateAccessToken({ token: newToken }))
        delete axios.defaults.headers.setCookie
      }
      return cbResp
    } catch (err) {
      store.dispatch(reset())
      return null
    }
  }
}
