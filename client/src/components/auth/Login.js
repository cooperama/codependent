import React, { useState } from "react";
import UserModel from "../../models/user";

export default function Login() {
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
    console.log(username);
    UserModel.login(user).then((data) => {
      console.log(data);
    });
  };
  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            onChange={handleUsernameChange}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <input type="submit" value="log in" />
      </form>
    </div>
  );
}
