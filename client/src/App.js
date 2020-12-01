import { Navbar } from "./components";
import routes from "./config/routes";

function App() {
  return (
    <div className="App">
      <Navbar />
      {routes}
    </div>
  );
}

export default App;
