import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserModel from "../../models/user";

export default function Login({
  setUserState,
  errorMessageRef,
  displayWarning,
}) {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    UserModel.login(user).then((data) => {
      if (data.error) {
        displayWarning();
        errorMessageRef.current.innerText = `${data.error} \n please try again`;
      } else {
        localStorage.setItem("uid", data.signedJwt);
        UserModel.getUser().then((data) => {
          if (data.error) {
            displayWarning();
            errorMessageRef.current.innerText = `${data.error} \n please try again`;
          } else {
            setUserState(data.user);
            history.push(`/`);
          }
        });
      }
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
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
            placeholder="password"
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
          />
        </div>

        <input className="btn" type="submit" value="sign in" />
      </form>
    </div>
  );
}
