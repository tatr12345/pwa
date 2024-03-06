export interface IDeviceTokenCreate {
  app: number,
  info: {
    platform: 'Desktop'
  },
  token: string
}

export interface IDeviceTokenDelete {
  app: number,
  token: string
}
