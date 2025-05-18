import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SecurityIcon from "@mui/icons-material/Security";
import AdminLoginDrawer from "./home/AdminLoginDrawer";
import SafeResult from "./home/SafeResult";
import MaliciousResult from "./home/MaliciousResult";
import isURL from "validator/lib/isURL";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [step, setStep] = useState("input"); // 'input' | 'loading' | 'result'
  const [urlError, setUrlError] = useState("");

  const isValidURL = (str) => {
    return isURL(str, {
      require_protocol: false,
      require_host: true,
    });
  };

  const handleCheck = async (e) => {
    e.preventDefault();

    // check url
    if (!isValidURL(url)) {
      setUrlError("Invalid URL format. Please enter a valid URL.");
      return;
    }

    setUrlError(""); // 清除旧错误
    setStep("loading");

    try {
      const response = await axios.post("http://localhost:5050/", { url });

      // set time out
      setTimeout(() => {
        setResult(response.data.probabilities);
        setStep("result");
      }, 500);
    } catch (error) {
      console.error("Error checking URL:", error);
      setResult({ error: "Error occurred" });
      setStep("result");
    }
  };

  const handleReset = () => {
    setUrl("");
    setResult(null);
    setStep("input");
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <div className="w-full flex items-center justify-between bg-white px-6 py-4 shadow">
        <div className="flex items-center space-x-2">
          <SecurityIcon className="text-blue-600" />
          <span className="text-lg font-semibold text-gray-700">
            CyberSentinel Pro
          </span>
        </div>
        <div className="absolute top-4 right-6">
          <button
            onClick={() => setShowLogin(true)}
            className="border border-blue-500 text-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-50"
          >
            Admin Login
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col items-center justify-center flex-grow p-4 space-y-8">
        {step !== "result" && (
          <>
            <h1 className="text-5xl font-bold text-black text-center">
              Is this link safe?
            </h1>
            <p className="text-gray-600 text-center max-w-xl text-base">
              Scan a URL to detect malware, fake websites, and phishing attacks.
            </p>
          </>
        )}

        {/* Step: Input */}
        {step === "input" && (
          <form
            onSubmit={handleCheck}
            className="w-full max-w-xl p-6 border rounded shadow bg-white space-y-4"
          >
            <input
              type="text"
              placeholder="Enter URL here"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setUrlError("");
              }}
              className={`w-full p-3 border rounded ${
                urlError ? "border-red-500" : ""
              }`}
              required
            />

            {urlError && (
              <p className="text-red-500 text-sm -mt-2">{urlError}</p>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
            >
              Check URL
            </button>
          </form>
        )}

        {/* Step: Loading */}
        {step === "loading" && (
          <div className="flex items-center justify-center p-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-blue-600 font-medium text-lg">
              Analyzing...
            </span>
          </div>
        )}

        {/* Step: Result */}
        {step === "result" &&
          result &&
          (() => {
            const sorted = Object.entries(result).sort((a, b) => b[1] - a[1]);
            const topLabel = sorted[0][0];
            const isBenign = topLabel === "benign";

            return (
              <>
                {isBenign ? (
                  <SafeResult result={result} url={url} />
                ) : (
                  <MaliciousResult result={result} />
                )}
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
                >
                  Check another link
                </button>
              </>
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
