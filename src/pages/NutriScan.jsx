import React, { useState } from "react";
import toast from "react-hot-toast";
import { generateNutrition } from "../lib/gemini";

const NutriScan = () => {
  const [dish, setDish] = useState("");
  const [customMeal, setCustomMeal] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    const input = dish || customMeal;

    if (!input.trim()) {
      toast.error("Please enter a dish name or custom meal ingredients.");
      return;
    }

    setLoading(true);
    setNutrition(null);

    try {
      const result = await generateNutrition(input);
      setNutrition(result);

      toast.success("🎉 Nutrition analysis completed!", {
        id: "nutri-success",
      });
    } catch (err) {
      toast.error("Failed to analyze nutrition.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            NutriScan 🥗
          </h1>
          <p className="text-gray-600 mt-3">
            Analyze any dish or custom meal to get complete nutrition breakdown.
          </p>
        </div>

        {/* Form */}
        {!nutrition && <section>
            <div className="bg-green-50 rounded-3xl shadow-xl p-8 flex flex-col gap-6">

                {/* Dish Name */}
                <div>
                    <label className="font-semibold text-green-800">
                        Dish Name (Comma separated for more one than)
                    </label>
                    <input
                        type="text"
                        value={dish}
                        onChange={(e) => setDish(e.target.value)}
                        placeholder="e.g. paneer tikka, rice"
                        className="w-full border border-green-300 rounded-xl px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                {/* OR Divider */}
                <div className="text-center text-gray-500 font-medium">
                    OR
                </div>

                {/* Custom Meal */}
                <div>
                    <label className="font-semibold text-green-800">
                        Add Your Meal (Ingredients)
                    </label>
                    <textarea
                        value={customMeal}
                        onChange={(e) => setCustomMeal(e.target.value)}
                        placeholder="e.g., 2 eggs, 1 bowl rice, grilled chicken"
                        rows="4"
                        className="w-full border border-green-300 rounded-xl px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="bg-green-800 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold transition-all"
                >
                    {loading ? "Analyzing..." : "Analyze Nutrition"}
                </button>
            </div>
        </section>
        }

        {/* Results */}
        {nutrition && (
          <div className="mt-12 bg-white border border-green-200 shadow-lg rounded-3xl p-10">

            <h2 className="text-2xl font-bold text-green-800 mb-6">
              {nutrition.name}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-lg">

              <div className="bg-green-50 p-4 rounded-xl">
                🔥 Calories
                <div className="font-bold text-xl">{nutrition.calories} kcal</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                💪 Protein
                <div className="font-bold text-xl">{nutrition.protein} g</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                🍞 Carbs
                <div className="font-bold text-xl">{nutrition.carbs} g</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                🥑 Fats
                <div className="font-bold text-xl">{nutrition.fats} g</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                🌾 Fiber
                <div className="font-bold text-xl">{nutrition.fiber} g</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                🍬 Sugar
                <div className="font-bold text-xl">{nutrition.sugar} g</div>
              </div>

            </div>

            {/* Health Suggestion */}
            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-semibold text-orange-700 mb-2">
                🩺 Health Suggestion
              </h3>
              <p className="text-gray-700">
                {nutrition.healthSuggestion}
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default NutriScan;