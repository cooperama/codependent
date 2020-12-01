import { Switch, Route } from "react-router-dom";

import {} from "../components";
import {
  Home,
  Codegory,
  FindBuddy,
  Landing,
  Codegories,
  Profile,
} from "../pages";

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/" component={Landing} /> */}
    {/* <Route path="/user/:id" component={Home} /> */}
    <Route exact path="/codegory" component={Codegory} />
    {/* // ^^this will actually route to codegories/:id */}
    <Route exact path="/findbuddy" component={FindBuddy} />
    <Route exact path="/codegories" component={Codegories} />
    <Route path="/myprofile" component={Profile} />
    {/* // need :id param for this???? */}
  </Switch>
);

export default routes;
