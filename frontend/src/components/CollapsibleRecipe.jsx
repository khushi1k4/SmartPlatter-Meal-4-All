import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CollapsibleRecipe = ({ recipe }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-green-50 rounded-2xl shadow-md overflow-hidden transition-all duration-300">

      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <h4 className="text-lg font-semibold text-orange-600">
          {recipe.name}
        </h4>

        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable Content */}
      {open && (
        <div className="px-6 pb-6">
          {recipe.description && (
            <p className="text-gray-600 mb-4">
              {recipe.description}
            </p>
          )}

          {recipe.preparationSteps?.length > 0 && (
            <ol className="list-decimal ml-6 text-gray-700 space-y-2">
              {recipe.preparationSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

export default CollapsibleRecipe;