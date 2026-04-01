import React, { useState } from "react";
import GroceryBillScanner from "../components/GroceryBillScanner";
import GroceryBillResult from "../components/GroceryBillResult";
import {
  analyzeGroceryBillImage,
  generateMealForScanner,
} from "../lib/gemini";
import toast from "react-hot-toast";

const Scanner = () => {
  const [file, setFile] = useState(null);
  const [dietPreference, setDietPreference] = useState("");
  const [dietPlan, setDietPlan] = useState("");
  const [allergies, setAllergies] = useState("");

  const [extractedItems, setExtractedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = file && dietPreference && dietPlan;

  const getMissingFieldsMessage = () => {
    const missing = [];
    if (!file) missing.push("Upload your bill");
    if (!dietPreference) missing.push("Select diet preference");
    if (!dietPlan) missing.push("Select diet plan");

    if (missing.length === 0) return "";
    return `To enable analysis: ${missing.join(", ")}.`;
  };

  const handleAnalyze = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setError("");

    try {
      // STEP 1: Analyze Grocery Bill
      const billResult = await analyzeGroceryBillImage(file);
      const items = billResult?.items || [];

      if (!items.length) {
        setError("No items detected in the bill. Please try again.");
        setLoading(false);
        return;
      }

      // STEP 2: Generate Recipes
      const mealResult = await generateMealForScanner({
        ingredients: items,
        dietType: dietPreference,
        goal: dietPlan,
        allergies,
      });

      // SET ALL STATES TOGETHER
      setExtractedItems(items);
      setTotalAmount(billResult?.total || null);
      setMealPlan(mealResult);
      toast.success("🎉 Bill is analyzed and meal are suggested successfully!");

    } catch (err) {
      console.error("Error analyzing bill:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDietPreference("");
    setDietPlan("");
    setAllergies("");
    setExtractedItems([]);
    setTotalAmount(null);
    setMealPlan(null);
    setError("");
  };

  return (
    <section className="w-full bg-white pt-10 md:pt-8 pb-20 px-6">
      <div className="max-w-3xl md:max-w-2xl lg:max-w-xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-3xl font-bold text-black">
            Grocery Bill Scanner
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-sm">
            Upload a photo of your grocery bill and get personalized meal
            suggestions based on what you bought.
          </p>
        </div>

        {/* FORM - Show only when mealPlan is NOT ready */}
        {!mealPlan && (
          <div className="bg-green-50 rounded-3xl shadow-xl p-8 md:p-8 flex flex-col gap-8 md:gap-6">

            {/* Upload */}
            <GroceryBillScanner file={file} setFile={setFile} />

            {/* Diet Preference */}
            <div>
              <h3 className="text-xl md:text-lg font-semibold text-green-800 mb-3">
                Diet Preference *
              </h3>
              <select
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value)}
                className="w-full border border-green-300 rounded-xl px-4 py-3 md:py-2 text-sm md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <h3 className="text-xl md:text-lg font-semibold text-green-800 mb-3">
                Diet Plan *
              </h3>
              <select
                value={dietPlan}
                onChange={(e) => setDietPlan(e.target.value)}
                className="w-full border border-green-300 rounded-xl px-4 py-3 md:py-2 text-sm md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Diet Plan</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Balanced Diet</option>
              </select>
            </div>

            {/* Allergies */}
            <div>
              <h3 className="text-xl md:text-lg font-semibold text-green-800 mb-3">
                Allergies to Avoid (Optional)
              </h3>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="peanuts, dairy (comma separated)"
                className="w-full border border-green-300 rounded-xl px-4 py-3 md:py-2 text-sm md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              disabled={!isFormValid || loading}
              onClick={handleAnalyze}
              className={`mt-3 text-white text-lg md:text-base font-semibold py-3 md:py-2 rounded-2xl shadow-lg transition-all duration-300
                ${
                  isFormValid
                    ? "bg-green-800 hover:bg-orange-600 hover:scale-105"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {loading ? "Analyzing..." : "Analyze & Get Meal Suggestions"}
            </button>

            {/* Validation message */}
            {!isFormValid && (
              <p className="text-sm md:text-xs text-gray-600 text-center mt-2">
                {getMissingFieldsMessage()}
              </p>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-600 text-center font-medium text-sm md:text-xs">
                {error}
              </p>
            )}
          </div>
        )}

        {/* RESULT - Only show when mealPlan exists */}
        {mealPlan && (
          <GroceryBillResult
            extractedItems={extractedItems}
            totalAmount={totalAmount}
            mealPlan={mealPlan}
            onReset={handleReset}
          />
        )}
      </div>
    </section>
  );
};

export default Scanner;