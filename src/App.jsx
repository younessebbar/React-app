import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import QuizMaker from "./QuizMaker.jsx";
import QuizResults from "./QuizResults.jsx";
import { QuizProvider } from "./QuizContext.jsx";

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="container-fluid full-height">
          <h1 className="mb-3 text-center">QUIZ MAKER</h1>
          <Routes>
            <Route path="/" element={<QuizMaker />}></Route>
            <Route path="/results" element={<QuizResults />}></Route>
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
