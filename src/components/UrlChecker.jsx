import React, { useState } from "react";
import axios from "axios";

export default function UrlChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5050/", { url });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error checking URL:", error);
      setResult("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 space-y-8">
      {/* input part */}
      <div className="w-full max-w-xl p-6 border rounded shadow bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🔍 Malicious URL Detector
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check URL"}
          </button>
        </form>
      </div>

      {/* result part */}
      {result && (
        <div className="w-full max-w-xl p-6 border rounded shadow bg-green-50">
          <h3 className="text-xl font-semibold text-center mb-2">
            Scan Result
          </h3>
          <p className="text-center text-lg text-gray-800">
            <strong>Result:</strong> {result}
          </p>
        </div>
      )}
    </div>
  );
}
