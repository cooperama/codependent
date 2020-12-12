import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import UserModel from "../../models/user";

export default function Signup({ userState, setUserState }) {
  const errorRef = useRef();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  //
  const [newUser, setNewUser] = useState();
  //

  const handleInputChange = (e) => {
    console.log("input change");
    const property = e.target.name;
    setNewUser({
      ...newUser,
      property: e.target.value,
    });
    console.log("new user: ", newUser);
  };
  //
  const history = useHistory();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    console.log(e.target.name);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };
  //

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };

    UserModel.create(newUser).then((data) => {
      console.log("creating user in Signup.js : ", data);
      if (data.error) {
        errorRef.current.innerText = `${data.error} \n try again`;
        setPassword("");
        setPassword2("");
      } else {
        localStorage.setItem("uid", data.signedJwt);
        UserModel.getUser().then((data) => {
          setUserState(data.user);
          history.push(`/myprofile`);
        });
      }
    });
  };
  return (
    <div className="signup-container">
      <p ref={errorRef} className="error-message"></p>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <input
            placeholder="username"
            onChange={(handleInputChange, handleUsernameChange)}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="email"
            onChange={(handleInputChange, handleEmailChange)}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="password"
            onChange={(handleInputChange, handlePasswordChange)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="confirm password"
            onChange={(handleInputChange, handlePassword2Change)}
            type="password"
            name="password2"
            id="password2"
          />
        </div>
        <input placeholder="" type="submit" value="sign up" />
      </form>
    </div>
  );
}
