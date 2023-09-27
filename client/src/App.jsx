import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import TestPage from "./pages/TestPage/TestPage";
import Quiz from "./pages/Quiz/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/tests/create" element={<TestPage />}></Route>
        <Route path="/quiz/:docId" element={<Quiz />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
