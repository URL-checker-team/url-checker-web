import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UrlChecker from "./components/UrlChecker";
import Login from "./components/Login.jsx";
import Home from "./components/Home";

import AdminLayout from "./components/admin/AdminLayout";
import ReportSummary from "./components/admin/ReportSummary";
import History from "./components/admin/History";
import DatasetManagement from "./components/admin/DatasetManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="report" element={<ReportSummary />} />
          <Route path="history" element={<History />} />
          <Route path="dataset" element={<DatasetManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
