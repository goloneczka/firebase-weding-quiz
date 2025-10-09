import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./component/auth/index";
import "./App.css";
import { UserContainer } from "./component/user";
import { QuizContainer } from "./component/quiz";
import { QuizQuestionContainer } from "./component/quiz/question";
import { QuizEndView } from "./component/quiz/end-quiz";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/user" element={<UserContainer />} />
          <Route path="/quiz/:uuid" element={<QuizContainer />} />
          <Route path="/quiz/:uuid/page/:page" element={<QuizQuestionContainer />} />
          <Route path="/quiz/:uuid/end" element={<QuizEndView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
