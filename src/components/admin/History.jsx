import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.title = "Admin Dashboard - History";

    axios
      .get("http://localhost:5050/history")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error("Failed to fetch history:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🕓 Scan History</h1>

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
            {history.map((item, idx) => (
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
    </div>
  );
}
