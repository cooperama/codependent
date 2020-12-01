import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "./styles/styles.scss";

import {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
} from "./config/keys";

const domain = REACT_APP_AUTH0_DOMAIN;
const clientId = REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);
