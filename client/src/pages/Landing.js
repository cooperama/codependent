import React from "react";

import { Signup, Login } from "../components";

export default function Landing() {
  return (
    <div className="page-container">
      <p>Landing</p>
      <Signup />
      <Login />
    </div>
  );
}
