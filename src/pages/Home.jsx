import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import MealPlannerForm from "../components/MealPlannerForm";
import MealPlannerResult from "../components/MealPlannerResult";
import ScrollToTop from "../components/ScrollToTop";
import { generateMealPlan } from "../lib/gemini";
import toast from "react-hot-toast";

const Home = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastFormData, setLastFormData] = useState(null);

  const handleGenerate = async (formData) => {
    if (!formData) return;

    const ingredientsArray = Array.isArray(formData.ingredients)
      ? formData.ingredients
      : formData.ingredients
        ?.split(",")
        .map((i) => i.trim())
        .filter(Boolean) || [];

    const formattedData = {
      ingredients: ingredientsArray,
      familySize: formData.familySize || 1,
      region: formData.region || "",
    };

    setLastFormData(formattedData);
    setLoading(true);

    try {
      const result = await generateMealPlan(formattedData);
      setMealPlan({ ...result });
      toast.success("🎉 New meal plan generated successfully!");
    } catch (error) {
      console.error("Meal generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setMealPlan(null);
  };

  const handleRegenerate = () => {
    if (!lastFormData) return;
    console.log("Regenerating with:", lastFormData);
    handleGenerate(lastFormData);
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
          onRegenerate={handleRegenerate}
          onBack={handleBack}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Home;