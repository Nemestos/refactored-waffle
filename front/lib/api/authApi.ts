import { createApi } from '@reduxjs/toolkit/query/react'
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '../../types/auth.types'
import customFetchBase from './customFetchBase'
import { userApi } from './userApi'
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    signupUser: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query(data) {
        return { url: 'auth/signup', method: 'POST', body: data }
      }
    }),
    signinUser: builder.mutation<ILoginResponse, ILoginRequest>({
      query(data) {
        return { url: 'auth/signin', method: 'POST', body: data, credentials: 'include' }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          await dispatch(userApi.endpoints.getMe.initiate(null))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/logout',
          credentials: 'include'
        }
      }
    })
  })
})

export const { useSigninUserMutation, useSignupUserMutation, useLogoutUserMutation } = authApi
