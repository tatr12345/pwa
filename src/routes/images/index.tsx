import React from "react"
import img1 from './img1.png'
import img2 from './img2.png'

const PageImages = () => {
  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center">
        <div className="col-6">
          <img src={img1} alt="" />
        </div>
        <div className="col-6">
          <img src={img2} alt="" />
        </div>
      </div>
    </div>
  )
}

export default PageImages