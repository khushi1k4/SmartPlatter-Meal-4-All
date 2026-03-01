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

/**
 * Analyze grocery bill image and extract grocery items + total
 * Uses Gemini 2.5 Flash Vision
 */
export async function analyzeGroceryBillImage(file) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Convert file to base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
      });

    const base64Image = await toBase64(file);

    const prompt = `
You are a grocery bill analyzer.

1. Extract only grocery food item names.
2. Remove store name, invoice number, GST, prices.
3. Remove quantities like 1kg, 500ml.
4. Remove duplicates.
5. Return ONLY valid JSON (no markdown) in this format:

{
  "items": ["Rice", "Milk", "Eggs"],
  "total": number_or_null
}
`;

    const result = await model.generateContent([
      {
        text: prompt,
      },
      {
        inlineData: {
          mimeType: file.type,
          data: base64Image,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // Clean markdown if Gemini adds it
    const cleanText = text.replace(/```json|```/g, "").trim();

    // Extract JSON safely
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Gemini Bill Response:", cleanText);
      throw new Error("No valid JSON found in response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      total: parsed.total || null,
    };
  } catch (error) {
    console.error("Error analyzing grocery bill:", error);
    throw new Error("Failed to analyze grocery bill.");
  }
}

export async function generateMealForScanner({
  ingredients,
  dietType,
  goal,
  allergies,
  familySize = 4,
  region = "India",
  language = "English"
}) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert AI nutritionist and home chef.

These ingredients were extracted from a grocery bill:
${ingredients.join(", ")}

User Preferences:
Diet Type: ${dietType || "No restriction"}
Goal: ${goal || "Balanced Diet"}
Avoid Allergies: ${allergies || "None"}
Family Size: ${familySize}
Region: ${region}
Language: ${language}

INSTRUCTIONS:
- Create 4 to 5 different practical recipes.
- Use the provided ingredients as primary items.
- You may add basic kitchen staples (salt, oil, spices).
- Respect diet type strictly.
- Do NOT include allergy ingredients.
- Adapt recipes based on goal:
   • Weight Loss → low calorie, high fiber
   • Muscle Gain → high protein
   • Balanced Diet → balanced nutrients
- Keep recipes realistic and affordable.
- Indian-style meals preferred if applicable.

Return ONLY valid JSON in this format:

{
  "recipes": [
    {
      "name": "",
      "ingredientsUsed": [],
      "description": "",
      "preparationSteps": [],
      "estimatedCost": ""
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json|```/g, "").trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("Scanner Meal Response:", cleanText);
      throw new Error("No valid JSON found");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("Error generating scanner recipes:", error);
    throw new Error("Failed to generate recipes from scanner.");
  }
}