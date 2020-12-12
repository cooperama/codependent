import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AllUsersAvail } from "../components";

import UserModel from "../models/user";

export default function FindBuddy({ userState, setUserState }) {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      UserModel.getUser().then((data) => {
        if (data.user) {
          setUserState(data.user);
        } else {
          console.log("no user in profile useEffect..");
        }
      });
    } else {
      history.push("/register");
    }
  }, []);
  return (
    <div className="page-container">
      <div className="find-buddy-container">
        <div className="page-heading">
          {/* <div className="codegorypage-heading postpage-post-heading"> */}
          <h1>Find a Study Buddy</h1>
        </div>
        <div className="buddy-instructions">
          {/* <p>Find a Study Buddy!</p>
          <ol> */}
          <li>1. Choose an available time</li>
          {/* <li>2. Select overlapping time</li>
            <li>3. Send request</li>
          </ol> */}
        </div>
      </div>
      <div className="all-availability">
        <AllUsersAvail userState={userState} setUserState={setUserState} />
      </div>
    </div>
  );
}
