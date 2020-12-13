import React, { useRef } from "react";
import { Signup, Login } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export default function Landing({ userState, setUserState }) {
  const errorMessageRef = useRef();
  const warningRef = useRef();

  const displayWarning = () => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const showWarning = async () => {
      warningRef.current.classList.remove("hide-content");
      await sleep(1500);
      warningRef.current.classList.add("hide-content");
    };
    showWarning();
  };

  return (
    <div className="page-container">
      <div className="welcome-div">
        <div className="welcome-text">
          <h3>Welcome to</h3>
          <h1>
            co<span>[de]</span>pendent
          </h1>
          <h3>where weIterate together.</h3>
        </div>
      </div>
      <div className="login-signup-div">
        <div className="about">
          <p>Find a study buddy.</p>
          <p>Chat about code.</p>
          <p>Chat about not code.</p>
          <p>Read techie posts.</p>
          <p>Post techie posts.</p>
          <p>All kinds of good stuff.</p>
        </div>
        <div className="login-div">
          <Login
            errorMessageRef={errorMessageRef}
            userState={userState}
            setUserState={setUserState}
            displayWarning={displayWarning}
          />
        </div>
        <div className="signup-div">
          <Signup
            errorMessageRef={errorMessageRef}
            userState={userState}
            setUserState={setUserState}
            displayWarning={displayWarning}
          />
        </div>
        <div className="error-container hide-content" ref={warningRef}>
          <span className="error-icon">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </span>
          <p ref={errorMessageRef} className="error-message"></p>
        </div>
      </div>
    </div>
  );
}
