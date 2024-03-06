import { IUserInfo } from '@/ts/requests/responses/IUser'

interface IUser {
  loading: boolean,
  info: IUserInfo | null
}

interface IPush {

}

export interface IStore {
  user: IUser,
  push: IPush
}
