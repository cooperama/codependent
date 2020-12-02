import React from "react";
import { Link } from "react-router-dom";

export default function UserNav() {
  return (
    <div className="user-nav">
      <li className="user-nav-item">
        <Link to="/codegories">All Codegories</Link>
      </li>
      <li className="user-nav-item">
        <Link to="/nerdroom">Nerd Room</Link>
      </li>

      <li className="user-nav-item">
        <Link to="/findbuddy">Find Study Buddy</Link>
      </li>
      <li className="user-nav-item">
        <Link to="/register">signup login</Link>
      </li>
    </div>
  );
}
