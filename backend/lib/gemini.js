const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeMealsWithGemini(user, meals) {
  try {
    // 1. USE THE CORRECT PREVIEW MODEL STRING
    const modelId = "gemini-3.1-flash-lite-preview"; 
    
    // console.log(`🟡 Calling ${modelId}...`);

    const prompt = `
      You are a nutritionist. Analyze these meals for a ${user.age}y/o ${user.gender}.
      Meals: B:${meals.breakfast}, S:${meals.snacks}, L:${meals.lunch}, D:${meals.dinner}.
      Return ONLY JSON: {"calories": number, "protein": number, "carbs": number, "fat": number, "healthScore": number, "advice": "string"}
    `;

    // 2. Use the new generateContent structure
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        response_mime_type: "application/json",
      }
    });

    // 3. Extract text directly (simplified in the new SDK)
    const text = response.text;
    // console.log("🟢 Gemini Result:", text);

    return JSON.parse(text);

  } catch (err) {
    console.error("🔥 Gemini Backend Error:", err.message);
    // Throwing here allows your Express error handler to catch it, 
    // but returning a fallback keeps the app from crashing.
    return {
      calories: 0, protein: 0, carbs: 0, fat: 0, healthScore: 0,
      advice: "Nutrition service is temporarily unavailable. Please try again."
    };
  }
}

module.exports = analyzeMealsWithGemini;