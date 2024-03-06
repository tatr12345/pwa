import { api } from '@/api/service/endpoints'
import post from '@/api/service/post'
import {
  IDeviceTokenCreate as IDeviceTokenCreateData,
  IDeviceTokenDelete as IDeviceTokenDeleteData
} from '@/ts/requests/post-data/IPush'
import {
  TDeviceTokenCreate as TDeviceTokenCreateRes,
  TDeviceTokenDelete as TDeviceTokenDeleteRes,
} from '@/ts/requests/responses/IPush'

export const api_deviceTokenCreate = (data: IDeviceTokenCreateData) =>               post<TDeviceTokenCreateRes>('api_deviceTokenCreate', api.DEVICE_TOKEN_CREATE, data)
export const api_deviceTokenDelete = (data: IDeviceTokenDeleteData) =>               post<TDeviceTokenDeleteRes>('api_deviceTokenDelete', api.DEVICE_TOKEN_DELETE, data)
