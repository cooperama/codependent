import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UpdateAvailability } from "../components";
import UserModel from "../models/user";

export default function UpdateAvail({ userState, setUserState }) {
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
      <div className="calendar-container">
        <div className="update-calendar-heading">
          <h1>My Availability</h1>
        </div>
        <div className="update-instructions">
          <p>Select the time slot when you can buddy up. Click to remove.</p>
        </div>
        <div className="calendar-availability">
          <UpdateAvailability />
        </div>
      </div>
    </div>
  );
}
