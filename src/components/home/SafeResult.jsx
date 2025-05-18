import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function SafeResult({ result, url }) {
  const sortedResult = Object.entries(result).sort((a, b) => b[1] - a[1]);

  const topResult = sortedResult[0];
  const otherResults = sortedResult.slice(1);

  return (
    <div className="w-full max-w-2xl p-8 border rounded shadow bg-green-50 border-green-200 space-y-6">
      {/* URL in dashed box */}
      <div className="border-2 border-green-600 border-dashed rounded px-4 py-2 text-center text-green-800 font-medium break-words">
        {url}
      </div>

      {/* Success Icon */}
      <div className="flex justify-center">
        <CheckCircleOutlineIcon
          style={{ fontSize: 90 }}
          className="text-green-600"
        />
      </div>

      {/* Classification result split: top and others */}
      <div className="space-y-4">
        {/* Top result */}
        <div className="text-center text-green-700 text-xl font-bold">
          <strong>{topResult[0]}:</strong> {topResult[1]}%
        </div>

        {/* Other results */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-800 text-base font-medium">
          {otherResults.map(([label, prob]) => (
            <span key={label}>
              <strong>{label}:</strong> {prob}%
            </span>
          ))}
        </div>
      </div>

      {/* Safe message */}
      <p className="text-center text-green-700 font-semibold">
        The link is safe with no signs of harmful activity. You can go ahead.
      </p>
    </div>
  );
}
