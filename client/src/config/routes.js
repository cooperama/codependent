import { Switch, Route } from "react-router-dom";

import { ProtectedRoute } from "../components";
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
    <Route exact path="/findbuddy" component={FindBuddy} />
    <Route exact path="/codegories" component={Codegories} />
    <Route path="/codegories/:id" component={Codegory} />
    <ProtectedRoute path="/myprofile" component={Profile} />
    {/* // need :id param for this???? */}
  </Switch>
);

export default routes;
