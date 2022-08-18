import { createApi } from '@reduxjs/toolkit/query/react'
import { IBasicSuccessResponse, IObjectResponse } from '../../types/global.types'
import { IUpdateUserRequest, IUser } from '../../types/user.types'
import { setUser } from '../slices/users'
import customFetchBase from './customFetchBase'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: 'auth/me',
          credentials: 'include'
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(setUser(data))
        } catch (error) {}
      },
      providesTags: (result) => [{ type: 'Users', id: result?._id || null }]
    }),
    updateUser: builder.mutation<IUser, { id: string; user: IUpdateUserRequest }>({
      query({ id, user }) {
        return {
          url: `/users/${id}`,
          method: 'PATCH',
          credentials: 'include',
          body: user
        }
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Users', id },
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    getUser: builder.query<IUser, string>({
      query(id) {
        return {
          url: `/users/${id}`,
          credentials: 'include'
        }
      },
      providesTags: (result, error, id) => [{ type: 'Users', id }]
    }),

    getAllUsers: builder.query<IUser[], void>({
      query() {
        return {
          url: '/users',
          credentials: 'include'
        }
      },
      transformResponse: (results: IObjectResponse<IUser[]>) => results.data,
      // handle query invalidation
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Users' as const,
                id: _id
              })),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    deleteUser: builder.mutation<IBasicSuccessResponse, string>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: 'DELETE',
          credentials: 'include'
        }
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    deleteMotoOfUser: builder.mutation<IUser, { userId: string; motoId: string }>({
      query({ userId, motoId }) {
        return {
          url: `/users/${userId}/motos/${motoId}`,
          method: 'DELETE',
          credentials: 'include'
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Users', id: 'LIST' },
        { type: 'Users', id: userId }
      ]
    })
  })
})

export const {
  useDeleteUserMutation,
  useDeleteMotoOfUserMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetMeQuery,
  useGetUserQuery
} = userApi
