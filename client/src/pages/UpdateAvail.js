import React, { useEffect, useState } from "react";
import { UpdateAvailability } from "../components";
import UserModel from "../models/user";
export default function UpdateAvail({ userState, setUserState }) {
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
