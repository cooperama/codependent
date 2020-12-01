import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPeopleCarry } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { SideNav, AuthNav } from "../components";

export default function Navbar() {
  return (
    <nav>
      <SideNav />
      <AuthNav />
      <div className="codependent-logo">
        <li>
          <Link to="/">co[de]pendent</Link>
        </li>
      </div>
      <div className="profile-nav">
        <FontAwesomeIcon icon={faUserCircle} />
        <li>
          <Link to="/myprofile">My Profile</Link>
        </li>
      </div>
    </nav>
  );
}
