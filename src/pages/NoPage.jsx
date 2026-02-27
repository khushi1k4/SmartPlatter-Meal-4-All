import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import MealPlannerForm from "../components/MealPlannerForm";
import MealPlannerResult from "../components/MealPlannerResult";
import ScrollToTop from "../components/ScrollToTop";
import { generateMealPlan } from "../lib/gemini";

const Home = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    try {
      setLoading(true);

      const prompt = `
Ingredients: ${formData.ingredients}
Family Size: ${formData.familySize}
Region: ${formData.region}
      `;

      const result = await generateMealPlan(prompt);

      setMealPlan(result);
    } catch (error) {
      console.error("Meal generation failed:", error);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ScrollToTop />
      <HeroSection />

      <MealPlannerForm
        onGenerate={handleGenerate}
        loading={loading}
      />

      {mealPlan && (
        <MealPlannerResult mealPlan={mealPlan} />
      )}
    </div>
  );
};

export default Home;