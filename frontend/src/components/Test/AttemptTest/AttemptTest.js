import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
export default function TestAttempt() {
  const location = useLocation();
  const navigate=useNavigate();
  const [data, setData] = React.useState("");
  useEffect(() => {
    setData(location.state.row)
  }, []);
  console.log(data)
  return (
    <div className="auth-inner2">
      <h3>{data.test_Name}</h3>
      <hr></hr>
        <p className="TWarning">*Read the Instructions Carefully*</p>
        <p className="TLabel"> Description</p>
        <div className="TParagraph"><p >{data.description}</p> </div>
        
        <div className="row">
        
        <div className="col-md-6">
          <p className="TLabel" >
            Deadline:
          </p>
          <p className="TParagraph">{data.deadline}</p>
          </div>
          
          <div className="col-md-6">
          <p className="TLabel" >
          Total Time Allowed:
          </p>
          <p className="TParagraph">{data.total_Time_for_Test_in_Minutes} minutes</p>
          </div>
          </div>
          <div className="testbtn">
          <button type="button" className="button" onClick={() => navigate("/testquestion", { state: {answers:[],result:0,test:data,QIndex:0, timeForTest:data.total_Time_for_Test_in_Minutes, job: location.state.job,user:location.state.user,time_started:new Date()} })}>
            Next
          </button>
          </div>
          
    </div>
  );
}
