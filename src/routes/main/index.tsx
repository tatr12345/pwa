import React from "react"
import { Link } from "react-router-dom"

const PageMain = () => {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-4">
          <div className="row align-items-center">
            <div className="col-12">
              <Link to={`list`}>
                <span className="btn btn-primary text-light">List</span>
              </Link>
            </div>
            <div className="col-12">
              <Link to={`images`}>
                <span className="btn btn-primary text-light">Images</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageMain