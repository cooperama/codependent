import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import {
  Home,
  Codegory,
  FindBuddy,
  Landing,
  UpdateAvail,
  PostPage,
  Codegories,
  CollabLab,
  Settings,
  RequestBuddy,
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
          path="/updateavail"
          render={() => (
            <UpdateAvail userState={userState} setUserState={setUserState} />
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
          path="/request/:id"
          render={() => (
            <RequestBuddy userState={userState} setUserState={setUserState} />
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
          render={() => (
            <Profile userState={userState} setUserState={setUserState} />
          )}
        />
        <Route
          path="/collablab"
          render={() => (
            <CollabLab userState={userState} setUserState={setUserState} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
