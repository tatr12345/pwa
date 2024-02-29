import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts')
        if (result.data) {
          setList(result.data.splice(0, 5))
        }
      } catch (error) { }
    })()
  }, [])

  return (
    <div className="container-fluid bg-dark text-white">
      {list.map((el: any, i) => (
        <div className="row align-items-center justify-content-center" key={`post-${i}`}>
          <div className="col-2">{el.id}</div>
          <div className="col-2">{el.title}</div>
        </div>
      ))}
    </div>
  )
}

export default App
