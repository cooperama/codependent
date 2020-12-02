import React, { useState } from "react";

import UserModel from "../../models/user";

export default function Signup() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [fullname, setFullname] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    const newUser = {
      username,
      email,
      fullname,
      password,
    };
    console.log(newUser);
    UserModel.create(newUser).then((data) => {
      console.log(data);
    });
  };
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <input
            placeholder="username"
            onChange={handleUsernameChange}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="email"
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="full name"
            onChange={handleFullnameChange}
            type="text"
            name="fullname"
            id="fullname"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="password"
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="confirm password"
            onChange={handlePassword2Change}
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
