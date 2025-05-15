import { useEffect } from "react";

export default function ReportSummary() {
  useEffect(() => {
    document.title = "Admin Dashboard - Report Summary";
  }, []);

  // Fake summary stats
  const summary = {
    totalUrlsChecked: 1532,
    maliciousCount: 247,
    safeCount: 1285,
    latestCheck: "2025-05-15 14:36",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 Report Summary</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total URLs Checked</h2>
          <p className="text-3xl font-bold text-blue-600">
            {summary.totalUrlsChecked}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500 text-sm">Malicious URLs</h2>
          <p className="text-3xl font-bold text-red-500">
            {summary.maliciousCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500 text-sm">Safe URLs</h2>
          <p className="text-3xl font-bold text-green-500">
            {summary.safeCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500 text-sm">Latest Check</h2>
          <p className="text-xl text-gray-800">{summary.latestCheck}</p>
        </div>
      </div>
    </div>
  );
}
