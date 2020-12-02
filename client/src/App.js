// import { Navbar } from "./components";
// import routes from "./config/routes";

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       {routes}
//     </div>
//   );
// }

// export default App;

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
  Profile,
} from "./pages";

function App() {
  const [userState, setUserState] = useState();

  return (
    <div className="App">
      <Navbar userState={userState} setUserState={setUserState} />
      <Switch>
        <Route exact path="/" component={Home} />
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
        {/* <Route exact path="/findbuddy" component={FindBuddy} />
        <Route exact path="/codegories" component={Codegories} />
        <Route path="/codegories/:id" component={Codegory} />
        <Route path="/post/:id" component={PostPage} /> */}
        <Route
          path="/myprofile/:id"
          render={() => (
            <Profile userState={userState} setUserState={setUserState} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
