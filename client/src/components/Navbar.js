import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPeopleCarry } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { SideNav } from "../components";

export default function Navbar({ userState, setUserState }) {
  useEffect(() => {
    //
  }, []);
  const renderProfileContainer = () => {
    if (userState) {
      return (
        <>
          <li>
            <Link to={`/myprofile/${userState._id}`}>My Profile</Link>
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
      {userState ? "yes" : "no"}
      <div className="profile-nav">
        <FontAwesomeIcon icon={faUserCircle} />
        {renderProfileContainer()}
        {/* <li> */}
        {/* <Link to={`/myprofile/${userState._id}`}>My Profile</Link> */}
        {/* <Link to="/myprofile">My Profile</Link> */}
        {/* </li> */}
      </div>
    </nav>
  );
}
