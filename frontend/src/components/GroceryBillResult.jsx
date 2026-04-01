import React from "react";
import { ReceiptText } from "lucide-react";
import CollapsibleRecipe from "./CollapsibleRecipe";

const GroceryBillResult = ({
  extractedItems = [],
  totalAmount,
  mealPlan,
  onReset,
}) => {
  // 🔹 Categorization Logic
  const categorizeItems = (items) => {
    const categories = {
      proteins: [],
      fatsAndOils: [],
      fruitsAndVegetables: [],
      carbs: [],
      calcium: [],
    };

    items.forEach((item) => {
      const lower = item.toLowerCase();

      if (
        lower.includes("chicken") ||
        lower.includes("egg") ||
        lower.includes("paneer") ||
        lower.includes("dal") ||
        lower.includes("beans") ||
        lower.includes("fish") ||
        lower.includes("soy")
      ) {
        categories.proteins.push(item);
      } else if (
        lower.includes("oil") ||
        lower.includes("butter") ||
        lower.includes("ghee")
      ) {
        categories.fatsAndOils.push(item);
      } else if (
        lower.includes("milk") ||
        lower.includes("curd") ||
        lower.includes("cheese")
      ) {
        categories.calcium.push(item);
      } else if (
        lower.includes("rice") ||
        lower.includes("wheat") ||
        lower.includes("bread") ||
        lower.includes("atta") ||
        lower.includes("pasta")
      ) {
        categories.carbs.push(item);
      } else {
        categories.fruitsAndVegetables.push(item);
      }
    });

    return categories;
  };

  const categorized = categorizeItems(extractedItems);

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl p-8 mt-12 space-y-12">

      {/* 🔹 Section 1: Detected Items */}
      <div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          🧾 Detected Items in the Bill
        </h3>

        {extractedItems.length > 0 ? (
          <>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {extractedItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-green-50 px-3 py-2 rounded-lg text-green-800"
                >
                  {item}
                </li>
              ))}
            </ul>

            {totalAmount && (
              <p className="mt-4 text-gray-700 font-medium">
                Total Amount: ₹{totalAmount}
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-500">No grocery items detected.</p>
        )}
      </div>

      {/* 🔹 Section 2: Nutritional Segmentation */}
      <div>
        <h3 className="text-2xl font-bold text-green-800 mb-6">
          🥗 Nutritional Segmentation
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {Object.entries(categorized).map(([key, items], index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-xl shadow-sm"
            >
              <h4 className="font-semibold text-lg text-green-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h4>

              {items.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-700">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">
                  No items found in this category.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Section 3: Suggested Meals */}
      {mealPlan?.recipes?.length > 0 && (
      <div>
        <h3 className="text-2xl font-bold text-green-800 mb-6">
          🍽 Suggested Meals
        </h3>

        <div className="space-y-4">
          {mealPlan.recipes.map((recipe, index) => (
          <CollapsibleRecipe key={index} recipe={recipe} />
          ))}
        </div>
      </div>
      )}

      {/* 🔹 Reset Button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="mt-4 bg-green-800 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300"
        >
          Scan Another Bill
        </button>
      </div>

    </div>
  );
};

export default GroceryBillResult;