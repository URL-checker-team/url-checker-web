import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import AdminLayout from "./components/admin/AdminLayout";
import ReportSummary from "./components/admin/ReportSummary";
import History from "./components/admin/History";
import DatasetManagement from "./components/admin/DatasetManagement";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected Admin Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<ReportSummary />} />
            <Route path="report" element={<ReportSummary />} />
            <Route path="history" element={<History />} />
            <Route path="dataset" element={<DatasetManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
