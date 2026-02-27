import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import MealPlannerForm from "../components/MealPlannerForm";
import MealPlannerResult from "../components/MealPlannerResult";
import ScrollToTop from "../components/ScrollToTop";
import { generateMealPlan } from "../lib/gemini";

const Home = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastFormData, setLastFormData] = useState(null);

  const handleGenerate = async (formData) => {
  console.log("Button clicked with:", formData);

  // Ensure ingredients is an array
  const ingredientsArray = formData.ingredients
    ? formData.ingredients.split(",").map(i => i.trim()).filter(Boolean)
    : [];

  setLastFormData(formData);
  setLoading(true);

  try {
    const result = await generateMealPlan({
      ingredients: ingredientsArray,
      familySize: formData.familySize || 1,
      region: formData.region || ""
    });

    setMealPlan(result);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleBack = () => {
    setMealPlan(null);
  };

  return (
    <div>
      <ScrollToTop />

      {!mealPlan && (
        <>
          <HeroSection />
          <MealPlannerForm
            onGenerate={handleGenerate}
            loading={loading}
          />
        </>
      )}

      {mealPlan && (
        <MealPlannerResult
          data={mealPlan}
          onRegenerate={() => handleGenerate(lastFormData)}
          onBack={handleBack}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Home;