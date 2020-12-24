import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import PairedModel from "../models/paired";
import UserModel from "../models/user";

export default function UserNav({ userState, setUserState }) {
  const [paired, setPaired] = useState();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      UserModel.getUser().then((data) => {
        if (data.user) {
          setUserState(data.user);
        } else {
          console.log("no user in profile useEffect..");
          history.push("/register");
        }
      });
    } else {
      history.push("/register");
    }
    // PairedModel.all()
  }, []);

  return (
    <div className="user-nav">
      <span>
        <FontAwesomeIcon icon={faCalendar} />
      </span>
      <span>
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
      {/* gonna put schedule here laterrrr */}
    </div>
  );
}
