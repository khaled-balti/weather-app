import React from 'react'
import './Spinner.css'
const Spinner = () => {
  return (
    <div className="spinner-border text-light spinner-container" role="status" style={{width: "200px", height: '200px', marginTop: '500px'}}>
        <span class="sr-only"></span>
    </div>
  )
}

export default Spinner