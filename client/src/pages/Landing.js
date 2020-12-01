import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Login, Logout } from "../components";

export default function Landing() {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="page-container">
      <p>Landing</p>
      <Login />
      <Logout />
    </div>
  );
}
