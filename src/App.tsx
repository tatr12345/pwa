import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from '@/store/_store'
import PageApi from './routes/api'
import PageImages from './routes/images'
import PageMain from './routes/main'
import { Provider } from 'react-redux'
import PageAuth from './routes/auth'
import { useStartupRequestUserInfo } from './utils/useStartupRequestUserInfo'
import { useCreateDevicePushToken } from './utils/useCreateDevicePushToken'

function App() {
  useStartupRequestUserInfo()
  useCreateDevicePushToken()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PageMain />
    },
    {
      path: '/api',
      element: <PageApi />
    },
    {
      path: '/images',
      element: <PageImages />
    },
    {
      path: '/auth',
      element: <PageAuth />
    },
  ])

  return (
    <div className='bg-dark' style={{ width: '100vw', height: '100vh' }}>
      <RouterProvider router={router} />
    </div>
  )
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
