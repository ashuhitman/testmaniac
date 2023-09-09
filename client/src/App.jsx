import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import TestPage from "./pages/TestPage/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/tests/create" element={<TestPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
