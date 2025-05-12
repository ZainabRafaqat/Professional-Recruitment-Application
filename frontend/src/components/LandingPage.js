import React from 'react';
import { useHistory } from "react-router-dom";

import './LandingPage.css';
import OpenJobs from "./Jobs/OpenJobs/openjobs"
import { useNavigate } from 'react-router-dom';
import LandingImage from './Image/RecruiterImg.png';
function LandingPage() {
  let Navigate = useNavigate();

  const handleOpenJobsClick = () => {
    Navigate("/openjobs");
  }
  const handleJobPostClick = () => {
    Navigate("/managejob")
  }

  return (
    <div className='wrap-all container-fluid'>
      <div className='row d-flex justify-content-around align-content-center'>
        <div className='col-6 p-0 m-0 text-white'>
          <div className='row d-flex justify-content-center'>
            <h2 className='col-5 my-3'> Find a Job with <div className='PRS'>Recruiter.com</div></h2>
          </div>
          <div className='row d-flex justify-content-center'><p className='col-10 my-3'>A recruitment platform, specifically for companies who are looking for appropriate skills and for candidates who are in search of a job opportunity according to their skillset. This system has mainly two roles the Company and the Candidate.</p>
          </div>

          <div className='row d-flex justify-content-center'>
              <button className='col-3 landing-button py-3 px-1 m-2' onClick={handleOpenJobsClick}>Find Job</button>
            
            <button className='col-3 landing-button py-3 px-1 m-2' onClick={handleJobPostClick}>Post Job</button>
          </div>
        </div>

        <div className='w-auto col-5 p-0 m-0'>
          <img src={LandingImage} alt="image"></img>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
