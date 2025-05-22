import { useState, useEffect } from "react";

export default function DatasetManagement() {
  useEffect(() => {
    document.title = "Admin Dashboard - Dataset Management";
  }, []);

  const [file, setFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatusMessage("");
  };

  const handleUpload = () => {
    if (!file) {
      setStatusMessage("❌ Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatusMessage(`Uploading ${file.name}...`);

    fetch("http://localhost:5050/api/upload-dataset", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.filename) {
          setStatusMessage("✅ Dataset uploaded successfully.");
          localStorage.setItem("uploaded_filename", data.filename); // 🧠 存下来用于训练
        } else {
          setStatusMessage(
            "❌ Upload failed: " + (data.error || "Unknown error")
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setStatusMessage("❌ Upload failed.");
      });
  };

  const handleTrainModel = () => {
    const filename = localStorage.getItem("uploaded_filename");

    if (!filename) {
      setStatusMessage("❌ Please upload a dataset first.");
      return;
    }

    setStatusMessage("Training model...");

    fetch("http://localhost:5050/api/train-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename }), //to backend
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setStatusMessage("✅ Model trained successfully.");
        } else {
          setStatusMessage(
            "❌ Training failed: " + (data.error || "Unknown error")
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setStatusMessage("❌ Training request failed.");
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dataset Management</h1>

      {/* Upload Dataset Section */}
      <div className="bg-white p-6 rounded shadow max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Dataset (CSV)
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full text-sm"
          />
        </div>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Dataset
        </button>

        <hr className="my-4" />

        {/* Train Model Section */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Train model using uploaded dataset
          </label>
          <button
            onClick={handleTrainModel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Train Model
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="mt-4 text-sm text-gray-800 bg-gray-100 px-4 py-2 rounded">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}
