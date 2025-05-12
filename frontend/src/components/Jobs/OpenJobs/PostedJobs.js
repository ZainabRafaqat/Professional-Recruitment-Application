import axios from 'axios'
import Card from '@material-ui/core/Card'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './postedjobs.css'
function PostedJobs() {
  const [users, setUsers] = useState([])
  let [started, setStarted] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [postedJobsByID, setPostedJobsByID] = useState([])
  const [Status, setStatus] = useState([]);
  const [completed, setCompleted] = useState([])
  let [jobids,setjobids] = useState([]);
  let [Job,setJob]=useState([]);
  let [jobmap,setjobmap] = useState([]);


  let getJobById = async () => {
    let res = await axios.get('http://127.0.0.1:8000/getJobsbyCompany/' + 1)
    setUsers(res.data)
    setPostedJobsByID(res.data?.alljobs && res.data?.alljobs)

    for(let i =0 ; i < res.data.alljobs.length;i++){
         jobids[i] =res.data.alljobs[i].id;
    }
}


  let i = 0,res ;

let status1 = []; 
  const getStatusNumbers = async () => {
     for( i =0;i<jobids.length;i++){
      console.log("loop worksss?++ for job id ",jobids)
      res = await  axios.get('http://127.0.0.1:8000/getStatusInNumber/' + jobids[i])
      console.log("f-----",jobids[i]);
      status1[i]  = await res.data;
      console.log("res.data---",res.data);
     }
       //
//
    console.log("status1oout side looppp??????? nnn=",status1)
    console.log("status1",status1)
   //works here
   setStatus(status1);

  }
//  console.log("status1",status1);
  console.log("Status?? ??????????????",Status)//works here
  console.log("postedJobsByID",postedJobsByID)
  console.log("Status-------",Status)


  const handleOffer = () => {
    window.confirm('Are you sure to send an offer? tooo');
  }
  // var jobs ;
  console.log("Status????????",Status)
 // for(let i =0 ; i<= status1.length; i++)
 // {
 //   console.log(status1[i])
     //const {jobs} = status1[i];
    // const {Started} = status1[i];
   //  const {InProgress} = status1[i];
  //   const {Completed} =status1[i];


 // //

//console.log(userid,jobtitle)
useEffect(() => {
  getJobById();

}, [])
useEffect(() => {
  getStatusNumbers();

}, [])



  return <div>
{

  <Card>
 Hi user Nimra you have posted <strong>{Status.length}</strong> jobs
 <Card>
 {
   Status?.map((item,id)=>(
    <div key = {id}>
      <div><strong>job title :</strong> {item.jobs?.title}
      {item.jobs?.map((job,id)=>(
     <div key ={id}>
     <div>{job.title}</div>

     </div>
))
} </div>
      <div><strong>Started: </strong>{item.Started?.length}</div>
      <div><strong>InProgress: </strong>{item.Completed?.length}</div>
      <div><strong>Completed: </strong>{item.InProgress?.length}</div>

       <div ><button onClick={handleOffer} className="btn">Job Offer</button></div>
    </div>

  ))

 }

 </Card>
 </Card>



}

 </div>
}


export default PostedJobs