// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Generate structured meal plan including steps and cost in ₹
 * in a selected language
 */
export async function generateMealPlan({ ingredients, familySize, region, language = "English" }) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are a nutritionist. Generate a detailed meal plan using these ingredients: ${ingredients.join(", ")}.
Family size: ${familySize}.
Region: ${region}.
Language: ${language} (translate everything including recipe steps and tips into this language).

Return ONLY valid JSON (no markdown) with this structure:
{
  "breakfast": { 
    "name": "", 
    "ingredients": [], 
    "recipe": [],        // array of steps in ${language}
    "nutritionHighlight": "", 
    "estimatedCost": ""  // in ₹
  },
  "lunch": { "name": "", "ingredients": [], "recipe": [], "nutritionHighlight": "", "estimatedCost": "" },
  "dinner": { "name": "", "ingredients": [], "recipe": [], "nutritionHighlight": "", "estimatedCost": "" },
  "snack": { "name": "", "ingredients": [], "recipe": [], "nutritionHighlight": "", "estimatedCost": "" },
  "tips": ["tip1", "tip2", "tip3"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean text
    const cleanText = text.replace(/```json|```/g, "").trim();

    // Extract JSON
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Response text:", cleanText);
      throw new Error("No valid JSON found in response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Normalize steps (array of strings)
    const normalizeSteps = (recipe) => {
      if (!recipe) return [];
      if (Array.isArray(recipe)) return recipe;
      return recipe
        .split(/\n|\. |\; /)
        .map((step) => step.trim())
        .filter((step) => step.length > 0);
    };

    // Estimate cost if missing (₹50 per ingredient per person)
    const estimateCost = (meal) => {
      if (meal?.estimatedCost) return meal.estimatedCost;
      const ingredientsCount = meal?.ingredients?.length || 1;
      const cost = ingredientsCount * 50 * familySize;
      return `₹${cost}`;
    };

    // Build final mealPlan object
    const mealPlan = ["breakfast", "lunch", "dinner", "snack"].reduce((acc, key) => {
      const meal = parsed[key] || {};
      acc[key] = {
        name: meal.name || "",
        ingredients: meal.ingredients || [],
        recipe: normalizeSteps(meal.recipe),
        nutritionHighlight: meal.nutritionHighlight || "",
        estimatedCost: estimateCost(meal),
      };
      return acc;
    }, {});

    const nutritionTips = Array.isArray(parsed.tips) ? parsed.tips : [];

    console.log("Meal plan result:", { mealPlan, nutritionTips });

    return { mealPlan, nutritionTips };
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw new Error("Failed to generate meal plan. Please try again.");
  }
}