import React from "react";
import { Upload } from "lucide-react";

const GroceryBillScanner = ({ file, setFile }) => {

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (
      (selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg") &&
      selectedFile.size <= 10 * 1024 * 1024
    ) {
      setFile(selectedFile);
    } else {
      alert("Please upload PNG or JPG under 10MB.");
      setFile(null);
    }
  };

  return (
    <div>
      <h3 className="text-xl md:text-lg font-semibold text-green-800 mb-4 md:mb-3">
        Upload Your Grocery Bill *
      </h3>

      <label
        htmlFor="billUpload"
        className={`w-full h-56 md:h-44 flex flex-col items-center justify-center 
          bg-white border-2 border-dashed rounded-2xl cursor-pointer 
          transition-all duration-300
          ${
          file
            ? "border-green-600"
            : "border-green-400 hover:border-orange-500"
          }`}
        >
        {file ? (
          <span className="text-green-700 font-semibold text-lg">
            File Successfully Uploaded! ✅
          </span>
        ) : (
          <>
            <Upload size={40} className="text-green-700 mb-3" />
            <span className="text-lg font-semibold text-gray-800">
              Upload Your Bill
            </span>
            <span className="text-sm text-gray-500 mt-2">
              PNG, JPG format up to 10MB
            </span>
          </>
        )}
      </label>

      <input
        id="billUpload"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default GroceryBillScanner;