import React , { useEffect }from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth, user } from "../../login.component";
import logo from '../../images/rectangle.png';
import './jobDetail.css';
import { Helmet } from "react-helmet";
// <<<<<<< HEAD
// import JobDetailNavBtn from "./JobDetailNavBtn";
// import JobDeatilNavBtnEmp from "./JobDeatilNavBtnEmp";
// =======
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

import { Grow } from '@mui/material';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// >>>>>>> 2380f5e786abe95a31365913a578bb35c3290cb5
function JobDetail(props) {

  const id = localStorage.getItem("userId")
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

      
    const handleClose = () => {
      setOpen(false);
      navigate("/tests", { state: { job: location.state, user: user } })
  };
  const handleErrorClose = () => {
      setOpenError(false);
  };
  let getData = async () => {
    let body={
      Job:location.state.id,
      id:id
    }
    await axios.post("http://127.0.0.1:8000/jobApplyCheck/",body).then((res)=>{
      if(res.data==='True')
      setData(true)
    });
  }; 
  useEffect(() => {
    getData();
  }, []);
  console.log(data)
  return (


    <div className="nav-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>check</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      {/* <div className="nav-bar">
        <h3 className="logo">Recruiter.com</h3>
        <img className="img" src="https://www.w3schools.com/howto/img_avatar2.png" alt=''></img>
      </div> */}
      <div className="container">
        <div className="first">
          {/* <img src={logo} alt="logo"></img> */}
          <h1>{location.state.title}</h1>
          <h3> {location.state.currency}{location.state.salary}</h3>
        </div>
        <div className="sec">
          <h4>Company: {location.state.company_name}</h4>
          <h4>Job Type: {location.state.jobtype}</h4>
          <h4>Hours: {location.state.working_hours} Hours per Week</h4>
          <h4>{location.state.salarytype} Salary</h4>
        </div>

        <div className="third">
          <h2>Description</h2>
          <ul>
            <li>{location.state.description}</li>

          </ul>
        </div>
        {/*   <div className="forth">
              <h2>About the Role</h2>
            <ul>
                <li>data</li>
                <li>data</li>
                <li>data</li>
            </ul>
        </div>
        <div className="five">
              <h2>About the Role</h2>
            <ul>
                <li>data</li>
                <li>data</li>
                <li>data</li>
            </ul>
  </div>*/}
{/* <<<<<<< HEAD
        <JobDetailNavBtn apply={apply}></JobDetailNavBtn>
        <JobDeatilNavBtnEmp apply={apply} ></JobDeatilNavBtnEmp>
  </div>
     
======= */}
        <div className="six">
          {data?<button className="job-dtl-btn" onClick={() => { progress() }}>See Progress</button>:
          <button className="job-dtl-btn" disabled={data} onClick={() => { apply() }}>Apply</button>}
        </div></div>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          TransitionComponent={Grow}

          key={'jobapplytransition'}
        >
          <Alert severity="success">
            {message}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={2000}
          onClose={handleErrorClose}
          TransitionComponent={Grow}

          key={'jobapplytransition2'}
        >
          <Alert severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
{/* >>>>>>> 2380f5e786abe95a31365913a578bb35c3290cb5 */}


    </div>
  );
  function apply() {
    // if (id === null)
    //   navigate("/sign-in")
    // else {
      let body={
        Job:location.state.id,
        id:id
      }
      axios.post('http://127.0.0.1:8000/saveJobAppliedByUser/', body)
        .then(() => {
          setOpen(true)
          setMessage("Job Applied")
        })
        .catch(() => {
          setOpenError(true)
          setErrorMessage("Server Error")
        });
    // }
  }
  function progress(){
  //   if (auth === false)
  //   navigate("/sign-in")
  // else {
    navigate("/tests", { state: { job: location.state, user: user } })
    // }
  }
}

export default JobDetail;  