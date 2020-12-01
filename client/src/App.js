import { Navbar } from "./components";
import routes from "./config/routes";
import { Signup, Login } from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      {routes}
      <Signup />
      <Login />
    </div>
  );
}

export default App;
