import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Loading } from "./components";
import routes from "./config/routes";

function App() {
  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <div className="App">
      <Navbar />
      {routes}
    </div>
  );
}

export default App;
