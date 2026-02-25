import React, { useState } from "react";
import GroceryBillScanner from "../components/GroceryBillScanner";
import { useLanguage } from "../context/LanguageContext";

const Scanner = () => {
  const [file, setFile] = useState(null);
  const [dietPreference, setDietPreference] = useState("");
  const [dietPlan, setDietPlan] = useState("");
  const [allergies, setAllergies] = useState("");

  // Handle file validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (
        (selectedFile.type === "image/png" ||
          selectedFile.type === "image/jpeg") &&
        selectedFile.size <= 10 * 1024 * 1024
      ) {
        setFile(selectedFile);
      } else {
        alert("Please upload a PNG or JPG file under 10MB.");
        setFile(null);
      }
    }
  };

  // Check if form is valid
  const isFormValid = file && dietPreference && dietPlan;

  // Dynamic missing fields message
  const getMissingFieldsMessage = () => {
    const missing = [];

    if (!file) missing.push("Upload your bill");
    if (!dietPreference) missing.push("Select diet preference");
    if (!dietPlan) missing.push("Select diet plan");

    if (missing.length === 0) return "";
    return `To enable analysis: ${missing.join(", ")}.`;
  };

  const handleAnalyze = () => {
    if (!isFormValid) return;

    console.log("Analyzing...");
    // AI logic goes here
  };

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Grocery Bill Scanner
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-lg">
            Upload a photo of your grocery bill and get personalized meal
            suggestions based on what you bought.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-green-50 rounded-3xl shadow-xl p-8 md:p-12 flex flex-col gap-8">

          {/* Upload Section */}
          <GroceryBillScanner />

          {/* Diet Preference */}
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">
              Diet Preference *
            </h3>

            <select
              value={dietPreference}
              onChange={(e) => setDietPreference(e.target.value)}
              className="w-full border border-green-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Diet Preference</option>
              <option>Veg</option>
              <option>Non Veg</option>
              <option>Vegan</option>
              <option>Egg</option>
            </select>
          </div>

          {/* Diet Plan */}
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">
              Diet Plan *
            </h3>

            <select
              value={dietPlan}
              onChange={(e) => setDietPlan(e.target.value)}
              className="w-full border border-green-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Diet Plan</option>
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>Balanced Diet</option>
            </select>
          </div>

          {/* Allergies (Optional) */}
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">
              Allergies to Avoid (Optional)
            </h3>

            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Enter allergies (comma separated)"
              className="w-full border border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Analyze Button */}
          <button
            type="button"
            disabled={!isFormValid}
            onClick={handleAnalyze}
            className={`mt-4 text-white text-lg font-semibold py-4 rounded-2xl shadow-lg transition-all duration-300
              ${
                isFormValid
                  ? "bg-green-800 hover:bg-orange-600 hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Analyze & Get Meal Suggestions
          </button>

          {/* Reason Why Disabled */}
          {!isFormValid && (
            <p className="text-sm text-gray-600 text-center mt-2">
              {getMissingFieldsMessage()}
            </p>
          )}

        </div>
      </div>
    </section>
  );
};

export default Scanner;