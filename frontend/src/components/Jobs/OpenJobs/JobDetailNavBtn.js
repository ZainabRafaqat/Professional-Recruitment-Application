import React from 'react'

function JobDetailNavBtn(props) {
  return (
    <div> 
        <div className="six">
    <button onClick={() => {props.apply()}}>Apply</button>
    <button>Save</button>
        </div>
    </div>
  )
}

export default JobDetailNavBtn