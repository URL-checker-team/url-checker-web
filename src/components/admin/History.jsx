import { useEffect } from "react";

export default function History() {
  useEffect(() => {
    document.title = "Admin Dashboard - History";
  }, []);

  // Fake scan history data
  const history = [
    {
      url: "http://malicious-example.com",
      result: "Malicious",
      checkedAt: "2025-05-15 14:30",
    },
    {
      url: "https://safe-site.org",
      result: "Safe",
      checkedAt: "2025-05-15 13:45",
    },
    {
      url: "http://suspicious-domain.net",
      result: "Malicious",
      checkedAt: "2025-05-14 18:10",
    },
    {
      url: "https://example.com",
      result: "Safe",
      checkedAt: "2025-05-14 17:00",
    },
  ];

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
                    item.result === "Malicious"
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
