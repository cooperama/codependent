import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import PairedModel from "../models/paired";
import UserModel from "../models/user";

export default function UserNav({ userState, setUserState }) {
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
  }, []);

  return (
    <div className="user-nav">{/* gonna put schedule here laterrrr */}</div>
  );
}
