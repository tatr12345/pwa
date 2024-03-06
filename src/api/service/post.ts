import log from "@/utils/log"
import axios, { AxiosResponse } from "axios"

const post = async <T>(reqName: string, endpoint: string, data: object, auth: boolean | undefined = true): Promise<AxiosResponse<T>> => {
  log({ name: reqName, data, type: 'request' })

  return axios
    .post(endpoint, data, { ...auth && { headers: { Authorization: `Bearer ${window.localStorage.auth}` } } })
    .then((res) => {
      log({ name: reqName, data: res, type: 'response' })
      return res
    })
    .catch((res) => {
      log({ name: reqName, data: res.response, type: 'catch' })
      return res
    })
}

export default post