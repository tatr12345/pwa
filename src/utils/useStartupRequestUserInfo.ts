import { asyncUserInfo } from "@/store/userSlice"
import { useAppDispatch } from "@/store/_store"
import { useEffect } from "react"

export const useStartupRequestUserInfo = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      const auth = window.localStorage.getItem('auth')
      if (auth) {
        await dispatch(asyncUserInfo())
      }
    })()
  }, [])
}