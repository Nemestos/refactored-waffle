// import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
// import { IObjectResponse } from '../../types/global.types'
// import { IUser } from '../../types/user.types'
// import { proxyClient } from '../axios'
// export enum UsersStates {
//   IDLE = 'idle',
//   LOADING = 'loading'
// }

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/user.types'

// export interface AuthSliceState {
//   users: IUser[]

//   loading: UsersStates
//   error?: SerializedError
// }

// const internalInitialState: AuthSliceState = {
//   loading: UsersStates.IDLE,
//   users: [],
//   error: null
// }

// export const fetchUsers = createAsyncThunk('users/', async (_, thunkAPI) => {
//   try {
//     const resp = await proxyClient.get<IObjectResponse<IUser[]>>('api/users/')
//     return resp.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue({ error: error.message })
//   }
// })

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState: internalInitialState,
//   reducers: {
//     reset: () => internalInitialState
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//       state.users = [...action.payload.data]
//       state.loading = UsersStates.IDLE
//     })
//     builder.addCase(fetchUsers.rejected, (state, action) => {
//       state = { ...internalInitialState, error: action.error }
//       throw new Error(action.error.message)
//     })

//     builder.addCase(fetchUsers.pending, (state) => {
//       state.loading = UsersStates.LOADING
//     })
//   }
// })

// export const { reset } = usersSlice.actions
interface IUserState {
  user: IUser | null
}

const initialState: IUserState = {
  user: null
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    }
  }
})

export default userSlice.reducer

export const { logout, setUser } = userSlice.actions
