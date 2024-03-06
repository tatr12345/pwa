import { api } from '@/api/service/endpoints'
import post from '@/api/service/post'
import {
  IUserAuth as IUserAuthData,
  IUserInfo as IUserInfoData,
} from '@/ts/requests/post-data/IUser'
import {
  TUserAuth as TUserAuthRes,
  TUserInfo as TUserInfoRes,
} from '@/ts/requests/responses/IUser'

export const api_userAuth = (data: IUserAuthData) =>                                 post<TUserAuthRes>('api_userAuth', api.USER_AUTH, data, false)
export const api_userInfo = (data: IUserInfoData) =>                                 post<TUserInfoRes>('api_userInfo', api.USER_INFO, data)
