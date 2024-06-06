import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Questions from "./pages/Questions";
import MyQuestions from "./pages/MyQuestions";
import CreateQuestion from "./pages/CreateQuestion"; // Ensure the component is correctly imported
import QuestionDetail from "./pages/QuestionDetail";

import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/login" />;
// }

// function RegisterAndLogout() {
//   localStorage.clear();
//   return <Register />;
// }

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/questions" element={<Questions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} /> {/* Add the Logout route */}
        <Route
          path="/my-questions"
          element={
            <ProtectedRoute>
              <MyQuestions />
            </ProtectedRoute>
          }
        />
        <Route path="/questions/create" element={<CreateQuestion />} /> {/* Corrected here */}
        <Route path="/questions/:id" element={<QuestionDetail />} /> {/* Corrected here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
