import React from 'react'
import { useForm } from 'react-hook-form'
import { asyncUserAuth, asyncUserInfo } from '@/store/userSlice'
import { asyncDeviceTokenDelete, clearPush } from "@/store/pushSlice"
import { clearUser } from "@/store/userSlice"
import { useAppDispatch, useAppSelector } from "@/store/_store"
import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE } from '@/api/service/endpoints'

const PageAuth = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<any>()
  const dispatch = useAppDispatch()
  const { info } = useAppSelector(({ user }) => user)

  const onSubmit = async (formData: { email: string, password: string }) => {
    const resAuth = await dispatch(asyncUserAuth({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: GRANT_TYPE,
      username: formData.email,
      password: formData.password
    }))
    if (resAuth.type === 'user/asyncUserAuth/fulfilled') {
      await dispatch(asyncUserInfo())
    }
  }

  const logout = () => {
    dispatch(asyncDeviceTokenDelete({
      app: info!.app.id,
      token: String(window.localStorage.getItem('deviceToken'))
    }))
    window.localStorage.removeItem('auth')
    dispatch(clearPush())
    dispatch(clearUser())
  }

  const handleWeb = () => {
    navigator.credentials.get()
  }

  return (!info
    ? <div className='container'>
      <br />
      <div className='row'>
        <div className='col text-center'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input {...register('email')} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input {...register('password')} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">Submit</button>
              <div>
                <button type="button" className="btn btn-primary" onClick={handleWeb}>Web</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    : <div className="container">
      <br />
      <div className="row text-light text-center">
        <div className="col-2" />
        <div className="col-8">
          {`Authorized as ${info.user.name} ${info.user.surname}`}
          <br />
          <button onClick={logout} className="btn btn-primary">Logout</button>
        </div>
        <div className="col-2" />
      </div>
    </div>
  )
}

export default PageAuth
