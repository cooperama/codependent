import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import UserModel from "../../models/user";

export default function Signup({
  setUserState,
  errorMessageRef,
  displayWarning,
}) {
  const passwordRef = useRef();
  const password2Ref = useRef();
  const history = useHistory();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
      password2,
    };
    UserModel.create(newUser).then((data) => {
      if (data.error) {
        displayWarning();
        errorMessageRef.current.innerText = `${data.error} \n please try again`;
        passwordRef.current.value = "";
        password2Ref.current.value = "";
      } else {
        localStorage.setItem("uid", data.signedJwt);
        UserModel.getUser().then((data) => {
          if (data.error) {
            displayWarning();
            errorMessageRef.current.innerText = `${data.error} \n please try again`;
            passwordRef.current.value = "";
            password2Ref.current.value = "";
          } else {
            setUserState(data.user);
            history.push(`/myprofile`);
          }
        });
      }
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
            ref={passwordRef}
            placeholder="password"
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-group">
          <input
            ref={password2Ref}
            placeholder="confirm password"
            onChange={handlePassword2Change}
            type="password"
            name="password2"
            id="password2"
          />
        </div>
        <input className="btn" type="submit" value="sign up" />
      </form>
    </div>
  );
}
