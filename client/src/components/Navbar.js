import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faChevronDown,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { SideNav, UserNav } from "../components";

export default function Navbar({ userState, setUserState }) {
  const dropdownRef = useRef();
  useEffect(() => {
    //
  }, []);
  const handleDropdownClick = (e) => {
    //
    dropdownRef.current.classList.toggle("hide-profile-dropdown");
  };

  const handleSignoutClick = () => {
    dropdownRef.current.classList.add("hide-profile-dropdown");
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
                    to={`/myprofile/${userState._id}`}
                  >
                    <span>
                      <FontAwesomeIcon icon={faUser} />
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
          <Link to="/">co[de]pendent</Link>
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
