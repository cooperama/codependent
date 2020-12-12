import React, { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import FileBase from "react-file-base64";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

import UserModel from "../models/user";

export default function Settings({ userState, setUserState }) {
  const errorMessageRef = useRef();
  const errorBoxRef = useRef();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [fullname, setFullname] = useState();
  const [photo, setPhoto] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [password3, setPassword3] = useState();
  const history = useHistory();

  useEffect(() => {
    // if (localStorage.getItem("uid")) {
    //   UserModel.getUser().then((data) => {
    //     if (data.user) {
    //       setUserState(data.user);
    //     } else {
    //       console.log("no user in profile useEffect..");
    //       history.push(`/register`);
    //     }
    //   });
    // }
    setUsername(userState.username);
    setEmail(userState.email);
    setFullname(userState.fullname);
    setPhoto(userState.photo);
    setPassword(userState.password);
    setPassword2(userState.password2);
    setPassword3(userState.password3);
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };
  const handlePassword3Change = (e) => {
    setPassword3(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedUser = {
      username,
      email,
      fullname,
      // photo,
      password,
      password2,
      password3,
      // password: password2,
    };
    // console.log(editedUser);
    UserModel.update(userState._id, editedUser).then((data) => {
      if (data.error) {
        errorBoxRef.current.style.display = "block";
        errorMessageRef.current.innerText = `${data.error} \n please try again`;
      } else {
        console.log(data);
        // setUserState(data.user);
        history.push(`/myprofile`);
      }
    });
  };
  return (
    <div className="page-container">
      <div className="update-heading">
        <h1>Update Profile</h1>
      </div>
      <div className="edit-profile-container">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <input
              placeholder={userState.username}
              onChange={handleUsernameChange}
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className="form-group">
            <input
              placeholder={userState.email}
              onChange={handleEmailChange}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="form-group">
            <input
              placeholder={userState.fullname || "full name"}
              onChange={handleFullnameChange}
              type="text"
              name="fullname"
              id="fullname"
            />
          </div>
          {/* FileBase */}
          {/* <div className="form-group"> */}
          {/* <input
              placeholder={userState.photo}
              onChange={handlePhotoChange}
              type="file"
              name="photo"
              id="photo"
            /> */}

          {/* </div> */}
          <div className="form-group">
            <input
              placeholder="current password"
              onChange={handlePasswordChange}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="new password (optional)"
              onChange={handlePassword2Change}
              type="password"
              name="password2"
              id="password2"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="confirm new password"
              onChange={handlePassword3Change}
              type="password"
              name="password3"
              id="password3"
            />
          </div>
          {/* <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPhoto(base64)}
          /> */}
          <input placeholder="" type="submit" value="edit" />
        </form>
      </div>
      <div className="error-div" ref={errorBoxRef}>
        <span className="error-icon">
          <FontAwesomeIcon icon={faExclamation} />
        </span>
        <p ref={errorMessageRef} className="error-message"></p>
      </div>
    </div>
  );
}
