import React from "react";
import { Signup, Login } from "../components";
export default function Landing({ userState, setUserState }) {
  return (
    <div className="page-container">
      <div className="login-signup-div">
        <Signup userState={userState} setUserState={setUserState} />
        <Login userState={userState} setUserState={setUserState} />
      </div>
    </div>
  );
}
