import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import {SignIn} from "./components/login.component";
import SignUp from "./components/signup.component";
import OpenJobs from "./components/Jobs/OpenJobs/openjobs";
import Navbar from "./components/Navbar";
import JobDetail from "./components/Jobs/OpenJobs/JobDetail";
import ManageJob from "./components/Company/Job/ManageJob";
import CreateTest from "./components/Company/Test/CreateTest/createTest"
 
import TestTable from "./components/Test/TestList/testList";
import TestAttempt from "./components/Test/AttemptTest/AttemptTest";
import TestQuestion from "./components/Test/AttemptTest/TestQuestion";
import TestResult from "./components/Test/AttemptTest/TestResult";
import JobTable from "./components/Company/Job/jobTable";
import Dialog from "./components/Company/Test/CreateTest/EditDialog";
// <<<<<<< HEAD
import UserProfile from "./components/UserProfile/UserProfile";
import ProtectedRoute from  "./components/ProtectedRoute";

import PostedJobs from "./components/Jobs/OpenJobs/PostedJobs";
import CompanySignUp from "./components/Company/SignUp/company";
import { CompanySignIn } from "./components/Company/SignIn/companySignIn";
import CompanyProfile from "./components/Company/CompanyProfile/CompanyProfile";
import AppliedJobs from "./components/Jobs/OpenJobs/AppliedJobs";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes><Route exact path="/" element={<LandingPage />} /></Routes>
        <div className="auth-wrapper">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/openjobs"  element={<ProtectedRoute Component={OpenJobs} />} />
            <Route path="/appliedJobs"  element={<ProtectedRoute Component={AppliedJobs} />} />
            <Route path="/jobdetail" element={<ProtectedRoute Component={JobDetail} />} />
            <Route path="/managejob" element={<ProtectedRoute Component={ManageJob} />}  />
            <Route path="/createtest" element={  <ProtectedRoute Component={CreateTest} />    } />
            <Route path="/tests" element={ <ProtectedRoute Component={TestTable} />  } />
            <Route path="/testAttempt" element={ <ProtectedRoute Component={TestAttempt} />   } />
            <Route path="/testquestion" element={<ProtectedRoute Component={ TestQuestion} /> } />
            <Route path="/joblist" element={<ProtectedRoute Component={JobTable} />  } />
            <Route path="/result" element={<ProtectedRoute Component={TestResult } /> } />
            <Route path="/dialog" element={<ProtectedRoute Component={ Dialog} />} />
            <Route path="/userprofile" element={<ProtectedRoute Component={UserProfile} /> } />
            <Route path="/companyprofile" element={<ProtectedRoute Component={CompanyProfile} /> } />
            <Route path="/companySignUp" element={<CompanySignUp />} />
            <Route path="/companySignIn" element={<CompanySignIn />} />
          

            <Route path="/JobsbyCompany" element ={<PostedJobs/>} />
{/* <<<<<<< HEAD
======= */}
            {/* <Route path="/compiler" element={<ProtectedRoute Component= {Compiler} />} /> */}
{/* >>>>>>> master */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
