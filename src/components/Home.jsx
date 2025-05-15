import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SecurityIcon from "@mui/icons-material/Security";
import AdminLoginDrawer from "./home/AdminLoginDrawer";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5050/", { url });
      setResult(response.data.probabilities);
    } catch (error) {
      console.error("Error checking URL:", error);
      setResult("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <div className="w-full flex items-center justify-between bg-white px-6 py-4 shadow">
        {/* icon and name */}
        <div className="flex items-center space-x-2">
          <SecurityIcon className="text-blue-600" />
          <span className="text-lg font-semibold text-gray-700">
            CyberSentinel Pro
          </span>
        </div>

        {/* Admin Login */}
        <div className="absolute top-4 right-6">
          <button
            onClick={() => setShowLogin(true)}
            className="border border-blue-500 text-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-50"
          >
            Admin Login
          </button>
        </div>
      </div>

      {/* main */}
      <div className="flex flex-col items-center justify-center flex-grow p-4 space-y-8">
        {/* main title */}
        <h1 className="text-5xl font-bold text-black text-center">
          Is this link safe?
        </h1>
        {/* sub title */}
        <p className="text-gray-600 text-center max-w-xl text-base">
          Scan a URL to detect malware, fake websites, and phishing attacks.
        </p>
        {/* input part */}
        <form
          onSubmit={handleCheck}
          className="w-full max-w-xl p-6 border rounded shadow bg-white space-y-4"
        >
          <input
            type="text"
            placeholder="Enter URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check URL"}
          </button>
        </form>

        {/* result part */}
        {result &&
          (() => {
            const sortedResult = Object.entries(result).sort(
              (a, b) => b[1] - a[1]
            );
            const topLabel = sortedResult[0][0];
            const isBenign = topLabel === "benign";

            // background color
            const resultBoxClass = `w-full max-w-xl p-6 border rounded shadow ${
              isBenign
                ? "bg-green-50 border-green-200"
                : "bg-red-100 border-red-300"
            }`;

            return (
              <div className={resultBoxClass}>
                <h3 className="text-xl font-semibold text-center mb-4">
                  Scan Result
                </h3>
                <div className="text-center text-gray-800 space-y-1">
                  {sortedResult.map(([label, prob], index) => (
                    <p
                      key={label}
                      className={
                        index === 0
                          ? `text-xl font-bold ${
                              isBenign ? "text-green-700" : "text-red-700"
                            }`
                          : "text-base"
                      }
                    >
                      <strong>{label}:</strong> {prob}%
                    </p>
                  ))}
                </div>
              </div>
            );
          })()}
      </div>
      {/* Admin Login Drawer */}
      <AdminLoginDrawer
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </div>
  );
}
