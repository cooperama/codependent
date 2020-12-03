import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faChevronDown,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useHistory } from "react-router-dom";
import { SideNav, UserNav } from "../components";

export default function Navbar({ userState, setUserState }) {
  const dropdownRef = useRef();
  const history = useHistory();
  useEffect(() => {
    //
  }, []);
  const handleDropdownClick = (e) => {
    //
    dropdownRef.current.classList.toggle("hide-profile-dropdown");
  };
  const renderPhoto = () => {
    console.log(userState);
    if (userState.photo) {
      return (
        <img
          src={userState.photo}
          alt={userState.username}
          className="photo-thumbnail"
        />
      );
    } else {
      return <FontAwesomeIcon icon={faUser} />;
    }
  };
  const handleSignoutClick = () => {
    dropdownRef.current.classList.add("hide-profile-dropdown");
    setUserState(null);
    history.push("/register");
  };
  // const handleProfileClick = () => {
  //   dropdownRef.current.classList.add("hide-profile-dropdown");
  // };
  const renderProfileContainer = () => {
    if (userState) {
      return (
        <>
          <li className="cursor" onClick={handleDropdownClick}>
            {/* <Link to={`/myprofile/${userState._id}`}>My Profile</Link> */}
            <h4>[ {userState.username} ]</h4>
          </li>
          <div>
            <span onClick={handleDropdownClick}>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
            <div
              ref={dropdownRef}
              className="profile-dropdown hide-profile-dropdown"
            >
              <ul>
                <li>
                  <Link
                    onClick={handleDropdownClick}
                    to={`/myprofile`}
                    // to={`/myprofile/${userState._id}`}
                  >
                    <span>
                      {renderPhoto()}
                      {/* <FontAwesomeIcon icon={faUser} /> */}
                    </span>
                    <span>profile</span>
                  </Link>
                </li>

                <li>
                  <Link onClick={handleDropdownClick} to="/settings">
                    <span>
                      <FontAwesomeIcon icon={faCog} />
                    </span>
                    <span>settings</span>
                  </Link>
                </li>
                <li onClick={handleSignoutClick}>
                  <span>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
                  <span>sign out</span>
                </li>
              </ul>
            </div>
          </div>
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
          <Link to="/">
            <p className="logo">
              co<span className="logo-emphasis">[de]</span>pendent
            </p>
          </Link>
        </li>
      </div>
      {userState ? "yes" : "no"}
      <div className="profile-nav">
        <FontAwesomeIcon icon={faUserCircle} />
        {renderProfileContainer()}
      </div>
      <UserNav />
    </nav>
  );
}
