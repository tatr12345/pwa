import { IRootData } from './_RootData'

export type TUserAuth = {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  token_type: 'Bearer'
}

export interface IUserInfo {
  app: {
    id: number
  },
  user: {
    name: string,
    surname: string
  }
}
export type TUserInfo = IRootData<IUserInfo>
