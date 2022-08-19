import { createApi } from '@reduxjs/toolkit/query/react'
import moment from 'moment'
import { ICreateEventRequest, IEvent, IUpdateEventRequest } from '../../types/events.type'
import { IBasicSuccessResponse, IObjectResponse } from '../../types/global.types'
import customFetchBase from './customFetchBase'

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: customFetchBase,
  tagTypes: ['Events'],
  endpoints: (builder) => ({
    createEvent: builder.mutation<string, { event: ICreateEventRequest }>({
      query({ event }) {
        return {
          url: `/events`,
          method: 'POST',
          credentials: 'include',
          body: {
            ...event,
            startDate: moment(event.startDate).format('YYYY-MM-DD'),
            endDate: moment(event.endDate).format('YYYY-MM-DD')
          }
        }
      },
      invalidatesTags: [{ type: 'Events', id: 'LIST' }]
    }),
    updateEvent: builder.mutation<IEvent, { id: string; event: IUpdateEventRequest }>({
      query({ id, event }) {
        return {
          url: `/events/${id}`,
          method: 'PATCH',
          credentials: 'include',
          body: {
            ...event,
            startDate: moment(event.startDate).format('YYYY-MM-DD'),
            endDate: moment(event.endDate).format('YYYY-MM-DD')
          }
        }
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Events', id },
              { type: 'Events', id: 'LIST' }
            ]
          : [{ type: 'Events', id: 'LIST' }]
    }),
    getEvent: builder.query<IEvent, string>({
      query(id) {
        return {
          url: `/events/${id}`,
          credentials: 'include'
        }
      },
      providesTags: (result, error, id) => [{ type: 'Events', id }]
    }),

    getAllEvents: builder.query<IEvent[], void>({
      query() {
        return {
          url: '/events',
          credentials: 'include'
        }
      },
      transformResponse: (results: IObjectResponse<IEvent[]>) => results.data,
      // handle query invalidation
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Events' as const,
                id: _id
              })),
              { type: 'Events', id: 'LIST' }
            ]
          : [{ type: 'Events', id: 'LIST' }]
    }),

    deleteEvent: builder.mutation<IBasicSuccessResponse, string>({
      query(id) {
        return {
          url: `/events/${id}`,
          method: 'DELETE',
          credentials: 'include'
        }
      },
      invalidatesTags: [{ type: 'Events', id: 'LIST' }]
    })
  })
})

export const {
  useDeleteEventMutation,
  useUpdateEventMutation,
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetEventQuery
} = eventApi
