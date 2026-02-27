import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const MealPlannerForm = ({ onGenerate, loading }) => {
  const { t } = useLanguage();

  const [ingredients, setIngredients] = useState("");
  const [familySize, setFamilySize] = useState(1);
  const [region, setRegion] = useState("");

  // Quick suggestions from translation file
  const quickItems = Object.values(t.mealPlanner?.quickItems || {});

  const addQuickItem = (item) => {
    setIngredients((prev) =>
      prev ? `${prev}, ${item}` : item
    );
  };

  const handleGenerate = () => {
  console.log("Button clicked");

  // const handleGenerate = () => {
  //   if (!ingredients.trim() || !region) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }

    onGenerate({
      ingredients,
      familySize,
      region,
    });
  };

  return (
    <section id="mealPlannerForm" className="w-full bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-green-50 rounded-3xl shadow-xl p-8 md:p-12">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">
            {t.mealPlanner.heading}
          </h2>
          <p className="text-slate-600 mt-3 text-base md:text-lg">
            {t.mealPlanner.subheading}
          </p>
        </div>

        <div className="flex flex-col gap-8">

          {/* Ingredients Section */}
          <div>
            <h3 className="text-xl font-semibold text-green-800">
              {t.mealPlanner.ingredientsTitle}
            </h3>

            <p className="text-slate-600 text-sm mb-3">
              {t.mealPlanner.ingredientsSubtext}
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder={t.mealPlanner.ingredientsPlaceholder}
                className="flex-1 border border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => setIngredients("")}
                className="bg-green-700 hover:bg-orange-600 text-white p-3 rounded-xl transition"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {quickItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addQuickItem(item)}
                  className="text-sm px-3 py-1 bg-white border border-green-300 rounded-full hover:bg-green-200 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Family Size Section */}
          <div>
            <h3 className="text-xl font-semibold text-green-800">
              {t.mealPlanner.familySize}
            </h3>

            <div className="flex items-center gap-4 mt-3">
              <button
                type="button"
                onClick={() => setFamilySize((prev) => Math.max(1, prev - 1))}
                className="bg-green-200 p-3 rounded-full hover:bg-green-300 transition"
              >
                <Minus size={18} />
              </button>

              <input
                type="number"
                value={familySize}
                readOnly
                className="w-16 text-center text-lg font-semibold bg-white border border-green-300 rounded-xl py-2"
              />

              <button
                type="button"
                onClick={() => setFamilySize((prev) => prev + 1)}
                className="bg-green-200 p-3 rounded-full hover:bg-green-300 transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Region Selection */}
          <div>
            <h3 className="text-xl font-semibold text-green-800">
              {t.mealPlanner.region}
            </h3>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full mt-3 border border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">
                {t.mealPlanner.selectRegion}
              </option>

              {Object.values(t.mealPlanner?.regions || {}).map((regionName, index) => (
                <option key={index} value={regionName}>
                  {regionName}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className={`mt-6 text-lg font-semibold py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 ${
              loading
                ? "bg-green-400 cursor-not-allowed text-white"
                : "bg-green-800 hover:bg-orange-600 text-white"
            }`}
          >
            {loading ? "Generating..." : t.mealPlanner.generateButton}
          </button>

        </div>
      </div>
    </section>
  );
};

export default MealPlannerForm;