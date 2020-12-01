import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Signup, Login, Logout } from "../components";
export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className="page-container">
        <p>Profile</p>
        {/* {JSON.stringify(user, null, 2)} */}
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Logout />
      </div>
    )
  );
}
