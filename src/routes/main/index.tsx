import React from "react"
import { Link } from "react-router-dom"

const PageMain = () => {
  return (
    <div className="container">
      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-4 justify-content-center">
          <span className="text-center text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, dolore ipsa. Molestiae in ut tenetur!</span>
        </div>
      </div>
      <br />
      <div className="row justify-content-center">
        <div className="col-1 justify-content-center">
          <Link to={`api`}>
            <span className="btn btn-primary text-light">Api</span>
          </Link>
        </div>
        <div className="col-1 justify-content-center">
          <Link to={`images`}>
            <span className="btn btn-primary text-light">Images</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageMain