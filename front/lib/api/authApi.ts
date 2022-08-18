import { createApi } from '@reduxjs/toolkit/query/react'
import {
  ILoginUserRequest,
  ILoginUserResponse,
  IRegisterUserRequest,
  IRegisterUserResponse
} from '../../types/auth.types'
import customFetchBase from './customFetchBase'
import { userApi } from './userApi'
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    signupUser: builder.mutation<IRegisterUserResponse, IRegisterUserRequest>({
      query(data) {
        return { url: 'auth/signup', method: 'POST', body: data }
      }
    }),
    signinUser: builder.mutation<ILoginUserResponse, ILoginUserRequest>({
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
