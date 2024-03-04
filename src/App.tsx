import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import PageMain from './routes/main'
import PageApi from './routes/api'
import PageImages from './routes/images'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageMain />
    },
    {
      path: "/api",
      element: <PageApi />
    },
    {
      path: "/images",
      element: <PageImages />
    },
  ])
  
  return (
    <div className='bg-dark' style={{ width: '100vw', height: '100vh' }}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
