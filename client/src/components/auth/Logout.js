import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Logout() {
  const { logout, isAuthenticated } = useAuth0();

  // return (
  //   isAuthenticated && (
  //     <button onClick={() => logout({ returnTo: window.location.origin })}>
  //       Log Out
  //     </button>
  //   )
  // );
  return isAuthenticated && <button onClick={() => logout()}>Log Out</button>;
}
