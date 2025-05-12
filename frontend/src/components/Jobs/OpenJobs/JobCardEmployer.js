import React from "react";
import "./JobCardEmployer.css"
import {IconContext} from "react-icons";
import {HiOutlinePencilAlt } from 'react-icons/hi';
import {HiOutlineTrash } from 'react-icons/hi';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {HiOutlineBriefcase} from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
function JobCardEmployer(detail) {
    const navigate = useNavigate();
    
    return (
     
   <div  className="job-card" onClick={()=> navigate("/jobdetail", { state: detail.data })}>
    
   
<div className="icons">
    <IconContext.Provider value={{ className:"React-icons"}} >
        <HiOutlineTrash/>
        <HiOutlinePencilAlt/>
    </IconContext.Provider>
    
</div>

    
<div className="title">
<h2  >{detail.data.description}</h2>
</div>
<div className="job-info">
<h3 className="posted">{detail.data.title}</h3>
<h3 className="applicants">{detail.data.company_name}</h3>
<h3 className="location">
<IconContext.Provider value={{ className:"loc-icon"}} >
        <HiOutlineLocationMarker/>
</IconContext.Provider>

    Lahore, Pakistan</h3>
</div>
<div className="job-footer card-footer">
    <h3>{detail.data.jobtype}</h3>
    <h3><HiOutlineBriefcase/>  {detail.data.currency}{detail.data.salary}/{detail.data.salarytype}</h3>
</div>


    


</div>

    
    );
  }
export default JobCardEmployer;  