import { asyncDeviceTokenCreate } from "@/store/pushSlice"
import { useAppDispatch, useAppSelector } from "@/store/_store"
import { useEffect } from "react"

export const useCreateDevicePushToken = () => {
  const dispatch = useAppDispatch()
  const { info } = useAppSelector(({ user }) => user)

  useEffect(() => {
    (async () => {
      if (info) {
        await dispatch(asyncDeviceTokenCreate({
          app: info!.app.id,
          info: { platform: 'Desktop' }
        }))
      }
    })()
  }, [info])
}