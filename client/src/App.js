import React, { useState } from "react";
import UserModel from "./models/user";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import routes from "./config/routes";
import { Signup, Login } from "./components";
import {
  Home,
  Codegory,
  FindBuddy,
  Landing,
  PostPage,
  Codegories,
  Settings,
  NerdRoom,
  Profile,
} from "./pages";

function App() {
  const [userState, setUserState] = useState();

  return (
    <div className="App">
      <Navbar userState={userState} setUserState={setUserState} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          exact
          path="/settings"
          render={() => (
            <Settings userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          exact
          path="/register"
          render={() => (
            <Landing userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          exact
          path="/findbuddy"
          render={() => (
            <FindBuddy userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          exact
          path="/nerdroom"
          render={() => (
            <NerdRoom userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          exact
          path="/codegories"
          render={() => (
            <Codegories userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          path="/codegories/:id"
          render={() => (
            <Codegory userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          path="/post/:id"
          render={() => (
            <PostPage userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          path="/myprofile"
          // path="/myprofile/:id"
          render={() => (
            <Profile userState={userState} setUserState={setUserState} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
