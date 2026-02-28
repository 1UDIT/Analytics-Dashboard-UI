import React, { useState, type ChangeEvent, type DragEvent, } from "react";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      // Example API call
      await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      alert("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Upload Excel File
        </h2>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-500 transition"
        >
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            {file ? (
              <p className="text-green-600 font-medium">{file.name}</p>
            ) : (
              <p className="text-gray-500">
                Drag & Drop your .xlsx file here <br /> or click to browse
              </p>
            )}
          </label>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
};

export default UploadForm;