import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { cstorage } from "../CompanyProfile/firebase";
export default function CompanySignUp(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [logo, setLogo] = useState();
  const navigate = useNavigate();

  function ValidateEmail(mail) {

    if (mail != "") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
      }
      setError("You have entered an invalid email address!")
    }
    return (false)
  }
  const onLogoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0])
    }
  }

  const sendData = event => {

    let isFormValid = document.getElementById("data-form").checkValidity();
    if (!isFormValid) {
      document.getElementById("data-form").reportValidity();
    }
    else {
      event.preventDefault();
      if (ValidateEmail(emailAddress) === true) {
        let body = {
          name: name,
          description: description,
          emailAddress: emailAddress,
          location: location,
          website: website,
          logo: logo,
          password: password,
        }
        if (logo == null || logo == undefined) {
          body["logo"] = ""
          saveData(body)
        }
        else {

          const imageRef = ref(cstorage, `images/${emailAddress}`);
          uploadBytes(imageRef, logo).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              body["logo"] = url ? url : null
              saveData(body)
            }).catch(() => {
              setError("Please Check your Connection")
            });
          });
        }
      }
    }
  }
  function saveData(body) {
    axios
      .post(`http://127.0.0.1:8000/saveCompany/`, body)
      .then((res) => {
        console.log(res)
        if (res.data == "Company already exists")
          setError("Company already exists.")
        else {
          setError(null)
          navigate("/companySignIn")
        }
      })
      .catch(() => {
        setError("Server Error");
      });
  }
  return (
    <div className="formwrap">
      <div className="center">
        <h1>Sign Up as Recruiter</h1>
        <form id="data-form" onSubmit={sendData}>

          <div className="inputbox">
            <input
              required
              id="name"
              name="name"
              type="text"
              // className="form-control"
              // placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <span>Company name</span>
          </div>
          <div className="inputbox">
            <input
              required
              id="email"
              name="email"
              type="email"
              // className="form-control"
              // placeholder="Enter email"
              onChange={(event) => {
                setEmailAddress(event.target.value);
              }}
            />
            <span>Recruiter's Email address</span>
          </div>

          <div className="inputbox">
            <input
              id="loc"
              name="loc"
              type="text"
              required
              // className="form-control"
              // placeholder="Enter Location"
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
            <span>HeadQuarter Location</span>
          </div>
          <div className="inputbox">
            <input
              id="web"
              name="web"
              type="url"
              required
              // className="form-control"
              // placeholder="Enter Website URL"
              onChange={(event) => {
                setWebsite(event.target.value);
              }}
            />
            <span>Website</span>
          </div>
          <div className="form-group">
            <label>Company Logo</label>
            <input
              type="file"
              className="form-control border-0 border-bottom border-dark"
              placeholder="Logo"
              name="image"
              onChange={onLogoChange}

            />
          </div>
          <div className="form-group">
            <br />
            <span>About Company</span>
            <textarea
              id="desc"
              name="desc"
              className="form-control border-0 border-bottom border-dark"
              placeholder="Description"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <br />
          <div className="inputbox">
            <input
              required
              type="password"
              // className="form-control"
              // placeholder="Enter password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <span>Password</span>
          </div>
          {error ? <p className="alert alert-danger p-2 m-2 " role="alert">{error}</p> : null}
          <br></br>
          <div className="d-grid">
            <button
              type="submit"
              className="button0-hover button0"
            >
              Sign Up
            </button></div>
          <p className="forgot-password text-right"></p>
        </form>
      </div>

    </div>
  );
}

