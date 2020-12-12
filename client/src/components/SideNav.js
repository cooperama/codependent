import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faCode,
  faGlasses,
  faFilm,
  faHome,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";

export default function SideNav() {
  return (
    <div className="side-nav">
      <li className="side-nav-item">
        <Link to="/findbuddy">
          <p>
            <span>Buddy Up</span>
            <span>
              <FontAwesomeIcon icon={faPeopleArrows} />
            </span>
          </p>
        </Link>
      </li>
      {/* Below two items To Be Added~~ */}
      {/* <li className="side-nav-item">
        <Link to="/collablab">
          <p>
            <span>Collab Lab</span>
            <span>
              <FontAwesomeIcon icon={faCode} />
            </span>
          </p>
        </Link>
      </li>
      <li className="side-nav-item">
        <Link to="/collablab">
          <p>
            <span>Showcase</span>
            <span>
              <FontAwesomeIcon icon={faFilm} />
            </span>
          </p>
        </Link>
      </li> */}
      <li className="side-nav-item">
        <Link to="/nerdroom">
          <p>
            <span>Nerd Room</span>
            <span>
              <FontAwesomeIcon icon={faGlasses} />
            </span>
          </p>
        </Link>
      </li>
      <li className="side-nav-item">
        <Link to="/codegories">
          <p>
            <span>Codegories</span>
            <span>
              <FontAwesomeIcon icon={faLayerGroup} />
            </span>
          </p>
        </Link>
      </li>
    </div>
  );
}
