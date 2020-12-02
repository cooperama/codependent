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
    <Route exact path="/register" component={Landing} />
    <Route exact path="/findbuddy" component={FindBuddy} />
    <Route exact path="/codegories" component={Codegories} />
    <Route path="/codegories/:id" component={Codegory} />
    <Route path="/myprofile/:id" component={Profile} />
  </Switch>
);

export default routes;
