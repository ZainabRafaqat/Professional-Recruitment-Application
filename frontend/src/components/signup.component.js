import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import './Signup.css';
import './form.css';
import { storage } from "./UserProfile/firebase";
export default function SignUp(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const [isUser, setIsUser] = useState();
  const [imageFile, setImageFile] = useState();
  const [image, setImage] = useState(null);
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
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0])

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
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          password: password,
        }
        if (imageFile == null || imageFile == undefined) {
          body["image"] = ""
          saveData(body)
        }
        else {

          const imageRef = ref(storage, `images/${emailAddress}`);
          uploadBytes(imageRef, imageFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              body["image"] = url ? url : null
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
    console.log(body)
    axios
      .post(`http://127.0.0.1:8000/saveUser/`, body)
      .then((res) => {
        console.log(res)
        if (res.data == "User already exists")
          setError("Email already exists.")
        else {

          setError(null)
          navigate("/sign-in")
        }
      })
      .catch((error) => {
        setError(error);
      });
  }
  return (

    <div className="formwrap">
      <div className="center">
        <h1>Sign Up as Candidate</h1>
        <form id="data-form" onSubmit={sendData}>
          <div className="inputbox">
            <input
              required
              type="text"
              // className="form-control"
              // placeholder="First name"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <span>First name</span>
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              className="form-control border-0 border-bottom border-dark"
              placeholder="Profile Picture"
              name="image"
              onChange={onImageChange}

            />

          </div>
          <div className="inputbox">
            <input
              required
              type="text"
              // className="form-control"
              // placeholder="Last name"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <span>Last name</span>
          </div>
          <div className="inputbox">
            <input
              required
              type="email"
              // className="form-control"
              // placeholder="Enter email"
              onChange={(event) => {
                setEmailAddress(event.target.value);
              }}
            />
            <span>Email address</span>

          </div>
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
              onClick={(e) => sendData(e)}
            >
              Sign Up
            </button></div>
          <p className="forgot-password text-right"></p>
        </form>
      </div>
    </div>
  );
}

