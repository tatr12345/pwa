import axios from "axios"
import { api } from '@/api/service/endpoints'

export const api_webauthnAuth = () =>               axios.get('api_webauthnAuth', api.WEBAUTHN_LOGIN)
export const api_webauthnAuthOptions = (data: any) =>               axios.post(api.WEBAUTHN_LOGIN_OPTIONS, data)
