import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <li>
        <Link to="/">Home</Link>
        <Link to="/codegory">Codegories</Link>
        <Link to="/findbuddy">Find a Study Buddy</Link>
        <Link to="/nerdroom">Nerd Room</Link>
        <Link to="/myprofile">My Profile</Link>
      </li>
    </nav>
  );
}
