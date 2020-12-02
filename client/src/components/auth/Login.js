import React, { useState } from "react";
import UserModel from "../../models/user";
import { useHistory } from "react-router-dom";

export default function Login({ userState, setUserState }) {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, username, password };
    UserModel.login(user).then((data) => {
      setUserState(data.user);
      history.push(`/`);
      // history.push(`/myprofile/${data.user._id}`);
    });
  };
  const loadState = () => {
    setEmail("whyme@gmail.com");
    setPassword("why123!@#");
    setUsername("whyme");
    const user = { email, username, password };
    UserModel.login(user).then((data) => {
      setUserState(data.user);
      history.push(`/`);
      // history.push(`/myprofile/${data.user._id}`);
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
            placeholder="email"
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="email"
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

        <input type="submit" value="sign in" />
      </form>
      <button onClick={loadState}>go</button>
      {/* <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            placeholder="username"
            onClick={handleUsernameChange}
            type="text"
            name="username"
            id="username"
            value="whyme"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="email"
            onClick={handleEmailChange}
            type="email"
            name="email"
            id="email"
            value="why@gmail.com"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="password"
            onClick={handlePasswordChange}
            type="password"
            name="password"
            id="password"
            value="why123!@#"
          />
        </div>
        <button onClick={loadState}>go</button>
        <input type="submit" value="auto log in" />
      </form> */}
    </div>
  );
}
