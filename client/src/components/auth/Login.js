import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState({});
  const [email, setEmail] = useState({});

  const [password, setPassword] = useState({});

  const handleUsernameChange = (e) => {
    setUsername({ username: e.target.value });
  };
  const handleEmailChange = (e) => {
    setEmail({ email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ password: e.target.value });
  };
  return (
    <div>
      <p>Login</p>
      <form className="login-form">
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
