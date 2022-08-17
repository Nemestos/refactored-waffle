import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '../../types/auth.types'
import { IUser } from '../../types/user.types'
import { proxyClient } from '../axios'
export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading'
}

export interface AuthSliceState {
  accessToken: string
  me?: IUser
  currentMessage?: string
  loading: AuthStates
  error?: SerializedError
}

const internalInitialState: AuthSliceState = {
  accessToken: '',
  me: null,
  currentMessage: null,
  loading: AuthStates.IDLE,
  error: null
}

export const fetchMe = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const resp = await proxyClient.get<IUser>('api/me')
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const register = createAsyncThunk('auth/register', async (credentials: IRegisterRequest, thunkAPI) => {
  try {
    const resp = await proxyClient.post<IRegisterResponse>('api/register', credentials)
    return { me: resp.data.me }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const login = createAsyncThunk('auth/login', async (credentials: ILoginRequest, thunkAPI) => {
  try {
    const resp = await proxyClient.post<ILoginResponse>('api/login', credentials)
    return { accessToken: resp.data.accessToken, me: resp.data.me }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await proxyClient.delete('api/logout')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state: AuthSliceState, action: PayloadAction<{ token: string }>) {
      state.accessToken = action.payload.token
    },
    reset: () => internalInitialState
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.me = action.payload.me
      state.loading = AuthStates.IDLE
    })
    builder.addCase(login.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error }
      throw new Error(action.error.message)
    })
    builder.addCase(logout.fulfilled, () => internalInitialState)
    builder.addCase(login.pending, (state) => {
      state.loading = AuthStates.LOADING
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.me = action.payload.me
      state.loading = AuthStates.IDLE
    })
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error
    })

    builder.addCase(fetchMe.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error }
    })
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.me = action.payload
    })
  }
})

export const { updateAccessToken, reset } = authSlice.actions
