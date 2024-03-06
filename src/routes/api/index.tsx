import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
    <div className='container'>
      <br />
      <div className='row '>
        {data &&
          <>
            <div className="col-2" />
            <div className='col-8 text-white text-center'>
              {`${data.first_name} ${data.last_name}`}
            </div>
            <div className="col-2" />
          </>
        }
      </div>
    </div>
  )
}

export default PageApi
