import React from 'react'
import { useNavigate } from "react-router-dom";

function JobDeatilNavBtnEmp(props) {
  const navigate = useNavigate();
  return (
    <div>
        <div className="btnemp-display">
    <button onClick={()=>navigate("/jobdetail")}>Previous</button>
    <button id='view'>View Applications</button>
        </div>
    </div>
  )
}

export default JobDeatilNavBtnEmp