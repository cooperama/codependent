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

  const handleDropdownClick = (e) => {
    dropdownRef.current.classList.toggle("hide-profile-dropdown");
  };

  const renderPhoto = () => {
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
    localStorage.clear();
    history.push("/register");
  };

  // const renderSignup = () => {
  //   if (!userState) {
  //     return (
  //       <li>
  //         <Link to="/register">
  //           <span>
  //             <FontAwesomeIcon icon={faSignOutAlt} />
  //           </span>
  //           <span>sign in</span>
  //         </Link>
  //       </li>
  //     );
  //   } else {
  //     return (
  //       <li onClick={handleSignoutClick}>
  //         <span>
  //           <FontAwesomeIcon icon={faSignOutAlt} />
  //         </span>
  //         <span>sign out</span>
  //       </li>
  //     );
  //   }
  // };

  const renderProfileContainer = () => {
    if (userState) {
      return (
        <>
          <li className="cursor" onClick={handleDropdownClick}>
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
                  <Link onClick={handleDropdownClick} to={`/myprofile`}>
                    <span>{renderPhoto()}</span>
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
                {/* {renderSignup()} */}
              </ul>
            </div>
          </div>
        </>
      );
    } else {
      history.push("/register");
      // return (
      //   <>
      //     <li>
      //       <Link to="/register">Sign In</Link>
      //     </li>
      //   </>
      // );
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
      <div className="profile-nav">
        <FontAwesomeIcon icon={faUserCircle} />
        {renderProfileContainer()}
      </div>
      {/* <UserNav /> */}
    </nav>
  );
}
