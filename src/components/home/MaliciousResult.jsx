export default function MaliciousResult({ result }) {
    const sortedResult = Object.entries(result).sort((a, b) => b[1] - a[1]);
  
    return (
      <div className="w-full max-w-xl p-6 border rounded shadow bg-red-100 border-red-300">
        <h3 className="text-xl font-semibold text-center mb-4">Scan Result</h3>
        <div className="text-center text-gray-800 space-y-1">
          {sortedResult.map(([label, prob], index) => (
            <p
              key={label}
              className={
                index === 0 ? "text-xl font-bold text-red-700" : "text-base"
              }
            >
              <strong>{label}:</strong> {prob}%
            </p>
          ))}
        </div>
      </div>
    );
  }
  