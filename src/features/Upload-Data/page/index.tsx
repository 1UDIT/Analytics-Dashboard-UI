import React, {
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "@/features/Upload-Data/api/upload";
import { useNavigate } from "react-router-dom";



const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.setQueryData(["uploadedData"], data);

      navigate("/dashboard"); // ✅ navigate here
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  uploadMutation.mutate(
    {
      file: file,
      userName: "admin",
    },
    {
      onSuccess: () => {
        alert("File uploaded successfully!");
        setFile(null);
      },
    }
  );
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
          disabled={uploadMutation.isPending}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition disabled:opacity-50"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload File"}
        </button>

        {/* Error Message */}
        {uploadMutation.isError && (
          <p className="text-red-500 mt-3 text-center">
            {(uploadMutation.error as Error).message}
          </p>
        )}

        {/* Success Message */}
        {uploadMutation.isSuccess && (
          <p className="text-green-500 mt-3 text-center">
            Upload successful ✅
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadForm;