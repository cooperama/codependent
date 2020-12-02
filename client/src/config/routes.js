import { Switch, Route } from "react-router-dom";

import {} from "../components";
import {
  Home,
  Codegory,
  FindBuddy,
  Landing,
  Codegories,
  PostPage,
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
    <Route path="/myprofile" component={Profile} />
    <Route path="/post/:id" component={PostPage} />
  </Switch>
);

export default routes;
