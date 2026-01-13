import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

const KycVerify = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const documentTypes = [
    { value: "national_id", label: "National ID Card" },
    { value: "passport", label: "Passport" },
    { value: "driver_license", label: "Driver's License" },
    { value: "voter_card", label: "Voter's Card" },
  ];

  const [formData, setFormData] = useState({
    documentType: "national_id",
    documentNumber: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!validTypes.includes(file.type)) {
      setError("File must be JPG, PNG, or PDF format");
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.documentNumber.trim()) {
      setError("Please enter your document number");
      return;
    }

    if (!selectedFile) {
      setError("Please upload a document");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("documentType", formData.documentType);
      formDataToSend.append("documentNumber", formData.documentNumber.trim());
      formDataToSend.append("document", selectedFile);

      const response = await fetch(
        "https://qfs-backend-ghuv.onrender.com/api/kyc/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to upload document");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border p-8 text-center">
          <CheckCircleIcon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">
            Document Uploaded Successfully
          </h2>
          <p className="text-gray-600 mb-6">Waiting for admin verification.</p>
          <Link
            to="/account"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg"
          >
            Back to Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center mb-8">
        <Link to="/account" className="mr-4">
          <ArrowLeftIcon className="h-6 w-6 text-emerald-700" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">KYC Verification</h1>
          <p className="text-gray-600">Upload your identification document</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-6">
        <label className="block mb-4">
          <span className="text-sm font-medium">Document Type</span>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium">Document Number</span>
          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </label>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer mb-4"
        >
          <ArrowUpTrayIcon className="h-8 w-8 mx-auto text-gray-500 mb-2" />
          {selectedFile ? selectedFile.name : "Click to upload document"}
        </div>

        {error && (
          <div className="mb-4 flex items-center text-red-600 text-sm">
            <XCircleIcon className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Submit for Verification"}
        </button>
      </form>
    </div>
  );
};

export default KycVerify;
