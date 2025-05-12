import React, { useEffect } from "react";
import axios from 'axios';
import "./searchHeader.css"
import { useNavigate } from "react-router-dom";
function JobCard(detail) {
  const [data, setData] = React.useState(false);
  const id = localStorage.getItem("userId")
  const navigate = useNavigate();
  let getData = async () => {
    let body = {
      Job: detail.data.id,
      id: id
    }
    await axios.post("http://127.0.0.1:8000/jobApplyCheck/", body).then((res) => {
      if (res.data === 'True')
        setData(true)
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="job-list">
        {/* <div><img alt="job1" width="100%" height="70%" src="https://www.w3schools.com/howto/img_avatar2.png"></img></div> */}
        <div className="job">
          <h3 className="job-name">{detail.data.title}</h3>
          <div className="group">
            <h5 className="company">{detail.data.company_name}</h5>
            <h5 className="jobtype"> {detail.data.jobtype}</h5>
          </div>

        </div>
        <div className="info">
          <h4 className="salary"> {detail.data.currency}  {detail.data.salary}</h4>
          <div className="group">
            <h5 className="post-date">3 days ago</h5>
            <h5 className="salarytype">{detail.data.salarytype}</h5>
          </div>
        </div>
        <div>
          <button className="display-btn" style={{ height: "50%" }} onClick={() => navigate("/jobdetail", { state: detail.data })} >{data ? "See Progress" : "Apply"}</button>
        </div>
      </div>
    </div>
  );
}
export default JobCard;  