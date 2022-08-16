import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper'
import { authSlice } from './slices/auth'

const combinedReducers = combineReducers({
  authReducer: authSlice.reducer
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

export const store = configureStore<OurStore>({
  reducer: rootReducer
})

const makeStore: MakeStore = () => store

export const wrapper = createWrapper(makeStore, { storeKey: 'key' })

export type MyThunkDispatch = typeof store.dispatch
