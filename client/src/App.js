import CarDetails from "./CarDetails";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/car" element={<CarDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
