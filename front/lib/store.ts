import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authApi } from './api/authApi'
import { eventApi } from './api/eventApi'
import { motoApi } from './api/motoApi'
import { userApi } from './api/userApi'
import userReducer from './slices/users'

const combinedReducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [motoApi.reducerPath]: motoApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,

  userState: userReducer
})

export type OurStore = ReturnType<typeof combinedReducers>

const rootReducer = (state: ReturnType<typeof combinedReducers>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware, motoApi.middleware, eventApi.middleware])
})

const makeStore: MakeStore = () => store

export const wrapper = createWrapper(makeStore, { storeKey: 'key' })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
