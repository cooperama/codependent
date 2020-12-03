import React, { useState, useEffect } from "react";
import { AllUsersAvail } from "../components";

import UserModel from "../models/user";

export default function FindBuddy({ userState, setUserState }) {
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      console.log(localStorage);
      UserModel.getUser().then((data) => {
        console.log(data);
        if (data.user) {
          setUserState(data.user);
        } else {
          console.log("no user in profile useEffect..");
        }
      });
    }
  }, []);
  return (
    <div className="page-container">
      <div className="find-buddy-container">
        <div className="buddy-instructions">
          <p>Find a Study Buddy!</p>
          <ol>
            <li>1. Choose an available time</li>
            <li>2. Select overlapping time</li>
            <li>3. Send request</li>
          </ol>
        </div>
        <div className="all-availability">
          <AllUsersAvail userState={userState} setUserState={setUserState} />
        </div>
      </div>
    </div>
  );
}
