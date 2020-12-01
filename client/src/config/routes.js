import { Switch, Route } from "react-router-dom";

import {} from "./components";
import { Home } from "./pages";

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default routes;
