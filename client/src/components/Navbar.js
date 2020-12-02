import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { Link, useParams } from "react-router-dom";
import { SideNav } from "../components";

import UserModel from "../models/user";

export default function Navbar({ userState, setUserState }) {
  const history = useHistory();
  const params = useParams();
  useEffect(() => {
    // wanna set the user....
    console.log("usrestate: ", userState);
  }, [userState, setUserState]);
  const handleLogOut = () => {
    // make api call to user.logout.....
    // console.log("log out button");
    // UserModel.logout()
    //   .then(() => {
    //     // this works.... but takes a long time...
    //     setUserState(null);
    //     console.log("logged out...");
    //     history.push("/register");
    //   })
    //   .catch((err) => console.log("did not log out: ", err));
    // console.log(userState);
  };
  const renderMyProfile = () => {
    if (userState) {
      return (
        <>
          <li>
            <Link to={`/myprofile/${userState._id}`}>My Profile</Link>
          </li>
          <li>
            <button onClick={handleLogOut}>Log Out</button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/register">Log In</Link>
          </li>
        </>
      );
    }
  };
  return (
    <nav>
      <SideNav />

      <div className="codependent-logo">
        <li>
          <Link to="/">co[de]pendent</Link>
        </li>
      </div>
      <div className="profile-nav">
        <FontAwesomeIcon icon={faUserCircle} />
        {renderMyProfile()}
      </div>
    </nav>
  );
}
