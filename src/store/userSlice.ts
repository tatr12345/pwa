import { api_userAuth, api_userInfo } from '@/api/user'
import { IUserAuth } from '@/ts/requests/post-data/IUser'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialStore } from './_initial'

export const asyncUserAuth = createAsyncThunk(
  'user/asyncUserAuth',
  async (data: IUserAuth, { rejectWithValue }) => {
    const res = await api_userAuth(data)
    if (res.status !== 200 || !res.data) return rejectWithValue('user auth error')
    return res.data
  }
)

export const asyncUserInfo = createAsyncThunk(
  'user/asyncUserInfo',
  async (_, { rejectWithValue }) => {
    const res = await api_userInfo({
      device: 'browser',
      user_agent: navigator.userAgent
    })
    if (res.status !== 200 || !res.data.success)  return rejectWithValue('user info error')
    return res.data.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStore.user,
  reducers: {
    clearUser: () => initialStore.user
  },
  extraReducers(builder) {
    builder
      .addCase(asyncUserAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(asyncUserAuth.fulfilled, (state, action) => {
        const { access_token } = action.payload
        window.localStorage.setItem('auth', access_token)
        state.loading = false
      })
      .addCase(asyncUserAuth.rejected, (state) => {
        state.loading = false
      })
      //####################################################
      .addCase(asyncUserInfo.pending, () => {
        //00
      })
      .addCase(asyncUserInfo.fulfilled, (state, action) => {
        state.info = action.payload
      })
      .addCase(asyncUserInfo.rejected, () => {
        window.localStorage.removeItem('auth')
        window.localStorage.removeItem('deviceToken')
      })
  }
})

export const {
  clearUser
} = userSlice.actions

export default userSlice.reducer
