import React, { useState, useEffect } from "react";

export default function EditProfile() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState({});
  const [email, setEmail] = useState({});
  const [fullname, setFullname] = useState({});
  const [password, setPassword] = useState({});
  const [password2, setPassword2] = useState({});
  const [password3, setPassword3] = useState({});
  useEffect(() => {
    // set state ~ query for user
  }, []);
  const handleUsernameChange = (e) => {
    setUsername({ username: e.target.value });
  };
  const handleEmailChange = (e) => {
    setEmail({ email: e.target.value });
  };
  const handleFullnameChange = (e) => {
    setFullname({ fullname: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setPassword({ password: e.target.value });
  };
  const handlePassword2Change = (e) => {
    setPassword2({ password2: e.target.value });
  };
  const handlePassword3Change = (e) => {
    setPassword3({ password3: e.target.value });
  };
  return (
    <div>
      <p>Edit Profile</p>
      <form className="edit-profile-form">
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
          <label htmlFor="fullname">fullname</label>
          <input
            onChange={handleFullnameChange}
            type="text"
            name="fullname"
            id="fullname"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">current password</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">new password</label>
          <input
            onChange={handlePassword2Change}
            type="password"
            name="password2"
            id="password2"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password3">confirm password</label>
          <input
            onChange={handlePassword3Change}
            type="password"
            name="password3"
            id="password3"
          />
        </div>
        <input type="submit" value="sign up" />
      </form>
    </div>
  );
}
