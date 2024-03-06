import { IStore } from '@/ts/IStore'

export const initialStore: IStore = {
  push: {},
  user: {
    loading: false,
    info: null
  }
}
