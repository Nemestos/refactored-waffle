import { createApi } from '@reduxjs/toolkit/query/react'
import { IBasicSuccessResponse, IObjectResponse } from '../../types/global.types'
import { IMoto, IUpdateMotoRequest } from '../../types/motos.types'
import { IUser } from '../../types/user.types'
import customFetchBase from './customFetchBase'

export const motoApi = createApi({
  reducerPath: 'motoApi',
  baseQuery: customFetchBase,
  tagTypes: ['Motos'],
  endpoints: (builder) => ({
    updateMoto: builder.mutation<IMoto, { id: string; moto: IUpdateMotoRequest }>({
      query({ id, moto }) {
        return {
          url: `/motos/${id}`,
          method: 'PATCH',
          credentials: 'include',
          body: moto
        }
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Motos', id },
              { type: 'Motos', id: 'LIST' }
            ]
          : [{ type: 'Motos', id: 'LIST' }]
    }),
    getMoto: builder.query<IMoto, string>({
      query(id) {
        return {
          url: `/motos/${id}`,
          credentials: 'include'
        }
      },
      providesTags: (result, error, id) => [{ type: 'Motos', id }]
    }),

    getAllMotos: builder.query<IMoto[], void>({
      query() {
        return {
          url: '/motos',
          credentials: 'include'
        }
      },
      transformResponse: (results: IObjectResponse<IMoto[]>) => results.data,
      // handle query invalidation
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Motos' as const,
                id: _id
              })),
              { type: 'Motos', id: 'LIST' }
            ]
          : [{ type: 'Motos', id: 'LIST' }]
    }),

    getAllUserMotos: builder.query<IMoto[], string>({
      query(id) {
        console.log(id)
        return {
          url: `/users/${id}/motos`,
          credentials: 'include'
        }
      },
      transformResponse: (results: IObjectResponse<IMoto[]>) => results.data,
      // handle query invalidation
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Motos' as const,
                id: _id
              })),
              { type: 'Motos', id: 'LIST' }
            ]
          : [{ type: 'Motos', id: 'LIST' }]
    }),
    deleteMoto: builder.mutation<IBasicSuccessResponse, string>({
      query(id) {
        return {
          url: `/motos/${id}`,
          method: 'DELETE',
          credentials: 'include'
        }
      },
      invalidatesTags: [{ type: 'Motos', id: 'LIST' }]
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
        { type: 'Motos', id: 'LIST' },
        { type: 'Motos', id: userId }
      ]
    })
  })
})

export const {
  useDeleteMotoMutation,
  useDeleteMotoOfUserMutation,
  useUpdateMotoMutation,
  useGetAllMotosQuery,
  useGetAllUserMotosQuery,
  useGetMotoQuery
} = motoApi
