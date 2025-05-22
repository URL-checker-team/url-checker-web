import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    document.title = "Admin Dashboard - History";

    axios
      .get("http://localhost:5050/history")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error("Failed to fetch history:", err));
  }, []);

  const totalPages = Math.ceil(history.length / itemsPerPage);

  const currentItems = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Scan History</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">URL</th>
              <th className="px-6 py-3">Result</th>
              <th className="px-6 py-3">Checked At</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {currentItems.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{item.url}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    ["phishing", "malware", "defacement"].includes(
                      item.result.toLowerCase()
                    )
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.result}
                </td>
                <td className="px-6 py-4">{item.checkedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
