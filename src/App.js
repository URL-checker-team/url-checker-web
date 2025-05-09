import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlChecker from "./components/UrlChecker";
import Login from "./components/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/checker" element={<UrlChecker />} />
      </Routes>
    </Router>
  );
}

export default App;
