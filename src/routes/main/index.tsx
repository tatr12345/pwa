import React from 'react'
import { Link } from 'react-router-dom'

const PageMain = () => {
  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='col text-center text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis unde nobis aspernatur, sed omnis possimus!</div>
      </div>
      <br />
      <div className='row'>
        <div className='col text-center'>
          <Link to={'auth'}>
            <span className='btn btn-primary text-light'>Auth</span>
          </Link>
        </div>
        <div className='col text-center'>
          <Link to={'api'}>
            <span className='btn btn-primary text-light'>Api</span>
          </Link>
        </div>
        <div className='col text-center'>
          <Link to={'images'}>
            <span className='btn btn-primary text-light'>Images</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageMain
