import React from "react";
import { Signup, Login } from "../components";
export default function Landing({ userState, setUserState }) {
  return (
    <div className="page-container">
      <div className="welcome-div">
        <div className="welcome-text">
          <h3>Welcome to</h3>
          <h1>
            co<span>[de]</span>pendent
          </h1>
          <h3>where weIterate together.</h3>
        </div>
      </div>
      <div className="login-signup-div">
        <div className="about">
          <p>Find a study buddy.</p>
          <p>Chat about code.</p>
          <p>Chat about not code.</p>
          <p>Read techie posts.</p>
          <p>Post techie posts.</p>
          <p>All kinds of good stuff.</p>
        </div>
        <div className="login-div">
          <Login userState={userState} setUserState={setUserState} />
        </div>
        <div className="signup-div">
          <Signup userState={userState} setUserState={setUserState} />
        </div>
      </div>
    </div>
  );
}
