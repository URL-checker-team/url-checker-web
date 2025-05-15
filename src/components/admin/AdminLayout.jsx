import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const sidebarLinks = [
  { name: "Report Summary", path: "/admin/report" },
  { name: "History", path: "/admin/history" },
  { name: "Dataset Management", path: "/admin/dataset" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token or session
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-2 rounded hover:bg-gray-700 ${
              location.pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-gray-100 relative">
        {/* Logout button - top right */}
        <div className="absolute top-4 right-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Nested Page Content */}
        <Outlet />
      </div>
    </div>
  );
}
