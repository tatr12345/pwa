import React from 'react'
import img1 from './img1.png'
import img2 from './img2.png'

const PageImages = () => {
  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='col'>
          <img style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} src={img1} alt='1' />
        </div>
        <div className='col'>
          <img style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} src={img2} alt='2' />
        </div>
      </div>
    </div>
  )
}

export default PageImages
