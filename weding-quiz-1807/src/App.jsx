import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./component/auth/index";
import "./App.css";
import { LoggedUserContainer } from "./component/user";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/user" element={<LoggedUserContainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
