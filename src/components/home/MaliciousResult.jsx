import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export default function MaliciousResult({ result, url }) {
  const sortedResult = Object.entries(result).sort((a, b) => b[1] - a[1]);
  const topResult = sortedResult[0];
  const otherResults = sortedResult.slice(1);
  const topLabel = topResult[0];

  const warningMessageMap = {
    phishing:
      "This link leads to a phishing site designed to steal personal information like passwords or financial data. Stay away from the site and ensure your security software is active.",
    malware:
      "This link leads to a malicious site. It could infect your device with viruses, worms, spyware, trojans, and other malware.",
    defacement:
      "This link leads to a defaced website. Avoid interacting with the page, as it may compromise trust, leak data, or expose you to malware.",
  };

  const warningMessage =
    warningMessageMap[topLabel] ||
    "This link is potentially harmful. Proceed with extreme caution.";

  return (
    <div className="w-full max-w-2xl p-8 border rounded shadow bg-red-50 border-red-200 space-y-6">
      {/* URL in dashed red box */}
      <div className="border-2 border-red-500 border-dashed rounded px-4 py-2 text-center text-red-800 font-medium break-words">
        {url}
      </div>

      {/* Warning Icon */}
      <div className="flex justify-center">
        <ReportProblemIcon style={{ fontSize: 90 }} className="text-red-600" />
      </div>

      {/* Classification results */}
      <div className="space-y-4">
        {/* Top result (red and large) */}
        <div className="text-center text-red-700 text-xl font-bold">
          <strong>{topResult[0]}:</strong> {topResult[1]}%
        </div>

        {/* Other results (normal) */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-800 text-base font-medium">
          {otherResults.map(([label, prob]) => (
            <span key={label}>
              <strong>{label}:</strong> {prob}%
            </span>
          ))}
        </div>
      </div>

      {/* Dynamic warning message */}
      <p className="text-left text-red-700 font-semibold">{warningMessage}</p>
    </div>
  );
}
