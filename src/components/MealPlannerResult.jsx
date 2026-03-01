import React from "react";
import { FaCoffee, FaUtensils, FaMoon } from "react-icons/fa";

const MealPlannerResult = ({ data, onRegenerate, onBack, loading }) => {
  if (!data) return null;

  const { mealPlan, nutritionTips } = data;

  const mealIcons = {
    Breakfast: <FaCoffee className="inline-block mr-2 text-green-700" />,
    Lunch: <FaUtensils className="inline-block mr-2 text-green-700" />,
    Dinner: <FaMoon className="inline-block mr-2 text-green-700" />,
  };
  
  const renderSection = (title, sectionData) => {
    if (!sectionData) return null;

    console.log("MealPlannerResult data:", data);
    return (
      <div className="bg-white shadow-lg p-6 rounded-xl mb-6">
        <h2 className="text-2xl text-green-800 font-bold mb-4 flex items-center">{mealIcons[title]} {title}</h2>
        <h3 className="text-xl font-semibold">{sectionData.name}</h3>

        <h4 className="mt-4 font-semibold">Ingredients:</h4>
        <ul className="list-disc ml-6">
          {sectionData.ingredients?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {sectionData.recipe && sectionData.recipe.length > 0 && (
  <>
    <h4 className="mt-4 font-semibold">Steps:</h4>
    <ol className="list-decimal ml-6">
      {sectionData.recipe.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
  </>
)}

        <p className="mt-4 font-bold text-green-600">
  {sectionData.estimatedCost}
</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">

      {/* Meal Sections (Vertical) */}
      {renderSection("Breakfast", mealPlan?.breakfast)}
      {renderSection("Lunch", mealPlan?.lunch)}
      {renderSection("Dinner", mealPlan?.dinner)}

      {/* AI Nutrition Tips (Dynamic) */}
      {nutritionTips && nutritionTips.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8 shadow-sm">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            🥗 Personalized Nutrition Tips
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {nutritionTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 my-10">
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="bg-green-800 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition"
        >
          {loading ? "Generating..." : "Create Another Plan"}
        </button>

        <button
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl transition"
        >
          Back to Form
        </button>
      </div>

    </div>
  );
};

export default MealPlannerResult;