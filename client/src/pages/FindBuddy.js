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
          <h1>Find a Study Buddy</h1>
        </div>
        <div className="buddy-instructions">
          <li>1. Choose an available time. Hover to view more info.</li>
        </div>
      </div>
      <div className="all-availability">
        <AllUsersAvail userState={userState} setUserState={setUserState} />
      </div>
    </div>
  );
}
