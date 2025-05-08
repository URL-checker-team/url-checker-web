import React, { useState } from "react";
import axios from "axios";

console.log("UrlChecker component loaded");

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
        {result && (
          <div className="mt-4 text-lg text-center">
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
}
