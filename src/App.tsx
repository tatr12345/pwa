import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import PageMain from './routes/main'
import PageList from './routes/list'
import PageImages from './routes/images'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageMain />
    },
    {
      path: "/list",
      element: <PageList />
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
