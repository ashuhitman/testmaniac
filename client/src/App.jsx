import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import TestPage from "./pages/TestPage/TestPage";
import Quiz from "./pages/Quiz/Quiz";
import ScorePage from "./pages/ScorePage/ScorePage";
import QuizState from "./context/Test/TestState";

import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

function App() {
  const routes = [
    {
      path: "/",
      element: <HomePage />,
      requiresAuth: false,
    },
    {
      path: "/tests/create",
      element: <TestPage />,
      requiresAuth: false,
    },
    {
      path: "/tests/:docId",
      element: <Quiz />,
      requiresAuth: false,
    },
    {
      path: "/tests/:docId/result",
      element: <ScorePage />,
      requiresAuth: false,
    },
    {
      path: "/auth/login",
      element: <Login />,
      requiresAuth: false,
    },
    {
      path: "/auth/signup",
      element: <Signup />,
      requiresAuth: false,
    },
  ];
  return (
    <QuizState>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </QuizState>
  );
}

export default App;
