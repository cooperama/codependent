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
        <div className="calendar-availability">
          <UpdateAvailability />
        </div>
      </div>
    </div>
  );
}
