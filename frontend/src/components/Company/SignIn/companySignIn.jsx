import React, { useState } from "react";
import axios from "axios";
import '../../Signup.css';
import '../../form.css'
import { useNavigate, useLocation } from 'react-router-dom';
var auth = false
var user


function CompanySignIn(props) {

  const [emailAddress, setEmailAddress] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    setError("You have entered an invalid email address!")
    return (false)
  }
  function sendData(event) {
    let isFormValid = document.getElementById("company-signin-form").checkValidity();
    if (!isFormValid) {
      document.getElementById("data-form").reportValidity();
    }
    else {
      event.preventDefault();
      if (ValidateEmail(emailAddress) === true) {
        const body = {
          emailAddress: emailAddress,
          password: password,
        };
        axios
          .post(`http://127.0.0.1:8000/validateCompany/`, body)
          .then((response) => {
            auth = true;
            user = response.data;
            if (response.headers['content-type'] === "Login successfully") {
              localStorage.setItem("accessToken", true)
              localStorage.setItem("userId", response.data.id)
              localStorage.setItem("isUser", "Company")

              navigate("/companyprofile")
            }
            else
              setError(response.data)
          })
          .catch(() => {
            setError("Server Error");
          });
      }
    }
  }
  return (
    <center>
      <div className="formwrap">
        <div className="center">
          <h1>Sign In as Recruiter</h1>
          <form id="company-signin-form" onSubmit={sendData}>
            <div className="inputbox">
              <input

                type="email"
                id="email"
                name="email"
                required
                placeholder=""
                onChange={(event) => {
                  setError("");
                  setEmailAddress(event.target.value);
                }} />
                <span>Email</span>
            </div>
            <div className="inputbox">
              <input type="password"
                id="password"
                name="password"
                placeholder=""
                required
                onChange={(event) => {
                  setError("");
                  setPassword(event.target.value);
                }} />
              <span>Password</span>
            </div>
            <p className="text-danger p-2 m-2">{error}</p>
            <div className="d-grid">

            </div>

            <div className="d-grid">
              <button className="button0-hover button0" type="submit"> Submit</button></div>

            <div className="forget-pass">
              {/* <div className="up">
                <p> Forgot <a href="#">password?</a></p>
              </div> */}
              {/* <br></br> */}
              <div className="bottom">
                <p >
                  Not have an account? <a href="/CompanySignUp">Sign up</a> now
                </p>
              </div>
            </div>
          </form>
        </div></div></center>
  )
}


export { CompanySignIn, auth, user };