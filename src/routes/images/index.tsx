import React from "react"
import img1 from './img1.png'
import img2 from './img2.png'

const PageImages = () => {
  return (
    <div className="container">
      <br />
      <div className="row align-items-center justify-content-center">
        <div className="col-10">
          <img style={{ display: 'block', width: 150, height: 100, objectFit: 'cover' }} src={img1} alt="1" />
        </div>
      </div>
      <br />
      <div className="row align-items-center justify-content-center">
        <div className="col-10">
          <img style={{ display: 'block', width: 150, height: 100, objectFit: 'cover' }} src={img2} alt="11" />
        </div>
      </div>
    </div>
  )
}

export default PageImages