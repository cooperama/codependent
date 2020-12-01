import { Switch, Route } from "react-router-dom";

import {} from "../components";
import {
  Home,
  Codegory,
  FindBuddy,
  Landing,
  NerdRoom,
  Profile,
} from "../pages";

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/" component={Landing} /> */}
    {/* <Route path="/user/:id" component={Home} /> */}
    <Route exact path="/codegory" component={Codegory} />
    <Route exact path="/findbuddy" component={FindBuddy} />
    <Route exact path="/nerdroom" component={NerdRoom} />
    <Route path="/myprofile" component={Profile} /> // need :id param for
    this????
  </Switch>
);

export default routes;
