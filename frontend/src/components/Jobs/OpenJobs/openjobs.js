import axios from "axios";
import React, { useEffect } from "react";
import JobCards from "./JobCards";
import SearchHeader from "./searchHeader";
let usertype = localStorage.getItem("isUser");
function OpenJobs(props) {

  const [job,setJob]=React.useState([])
  let getData = async () => {
    let res = await axios.get("http://127.0.0.1:8000/getJobs/");
    let data = await res.data;
    setJob(<JobCards data={data}/>);
  }; 
 
  useEffect(() => {
    getData();
  }, []);
  if(usertype ==='Candidate'|| usertype ===''|| usertype===undefined){
    return (
      <div >
        {/* <div id='openJobsHeader'> */}
       
          {/* <SearchHeader></SearchHeader> */}
        {/* </div> */}
          <div  >
            {job}
          </div>
  
      </div>
    )

  }
else if(usertype ==='Company Executive'){
  return (
    <div >
      

      <div className='Job-Body' >
      <div className="jobbtn">
        <button id="btn">Post New Job</button>
      </div>
        <div className="job-container" >
          {job}
        </div>

      </div>
    </div>
  )

  
}
  
}

export default OpenJobs;