import { IDeviceTokenCreate, IDeviceTokenDelete } from '@/ts/requests/post-data/IPush'
import { initFirebase } from '@/utils/initFirebase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialStore } from './_initial'
import { getMessaging, getToken } from "firebase/messaging"
import { api_deviceTokenCreate, api_deviceTokenDelete } from '@/api/push'

export const asyncDeviceTokenCreate = createAsyncThunk(
  'app/asyncDeviceTokenCreate',
  async (data: Omit<IDeviceTokenCreate, 'token'>, { rejectWithValue }) => {
    const app = initFirebase()
    const messaging = getMessaging(app)
    if (!app || !messaging) rejectWithValue('device token create error')
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const token = await getToken(messaging)
      if (token) {
        const res = await api_deviceTokenCreate({
          ...data,
          token
        })
        if (res.status !== 200 || !res.data.success) return rejectWithValue('device token create error')
        window.localStorage.setItem('deviceToken', token)
        return true
      } else return rejectWithValue('device token create error')
    }
    return rejectWithValue('device token create error')
  }
)

export const asyncDeviceTokenDelete = createAsyncThunk(
  'user/asyncDeviceTokenDelete',
  async (data: IDeviceTokenDelete, { rejectWithValue }) => {
    const res = await api_deviceTokenDelete(data)
    if (res.status !== 200 || !res.data.success) return rejectWithValue('device token delete error')
    return true
  }
)

export const pushSlice = createSlice({
  name: 'push',
  initialState: initialStore.push,
  reducers: {
    clearPush: () => initialStore.push
  },
  extraReducers(builder) {
    builder
      .addCase(asyncDeviceTokenCreate.pending, () => {
        //00
      })
      .addCase(asyncDeviceTokenCreate.fulfilled, () => {
        //00
      })
      .addCase(asyncDeviceTokenCreate.rejected, () => {
        //00
      })
      //####################################################
      .addCase(asyncDeviceTokenDelete.pending, () => {
        //00
      })
      .addCase(asyncDeviceTokenDelete.fulfilled, () => {
        window.localStorage.removeItem('deviceToken')
      })
      .addCase(asyncDeviceTokenDelete.rejected, () => {
        //00
      })
  }
})

export const {
  clearPush
} = pushSlice.actions

export default pushSlice.reducer
