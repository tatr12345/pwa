import React, { useEffect, useState } from "react"
import axios from 'axios'

const PageApi = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    (async () => {
      try {
        const arr = []
        const result = await axios.get('https://random-data-api.com/api/v3/projects/32b28120-17f0-41f9-8f74-57b104f30cf4?api_key=c0eZMWAMzXwtXQyjtc9nlw')
        if (result.data) {
          setData({ first_name: result.data.first_name, last_name: result.data.last_name })
        }
      } catch (error) { }
    })()
  }, [])

  return (
    <div className="container-fluid text-white text-center">
      <div className="row align-items-center justify-content-center">
        <br />
        <br />
        <br />
        {data &&
          <div className="col-8">{`${data.first_name} ${data.last_name}`}</div>
        }
      </div>
    </div>
  )
}

export default PageApi