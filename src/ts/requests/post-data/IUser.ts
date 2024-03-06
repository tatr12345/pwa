export interface IUserAuth {
  client_id: number,
  client_secret: string,
  grant_type: 'password',
  username: string,
  password: string
}

export interface IUserInfo {
  device: 'browser',
  user_agent: typeof navigator.userAgent
}
