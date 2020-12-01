import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { Link, useParams } from "react-router-dom";
import { SideNav } from "../components";

import UserModel from "../models/user";

export default function Navbar() {
  const [user, setUser] = useState();
  const params = useParams();
  useEffect(() => {
    // wanna set the user....
    console.log("params: ", params);
    // UserModel.getUser();
  }, []);
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
        <li>
          <Link to="/myprofile/">My Profile</Link>
          {/* <Link to={`/myprofile/${id}`}>My Profile</Link> */}
        </li>
      </div>
    </nav>
  );
}
