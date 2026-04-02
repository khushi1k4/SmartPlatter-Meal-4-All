# 🥗 SmartPlatter AI — Meal4All
 <br/>
<div align="center">
  
> **Intelligent Meal Planning** 
> **• Grocery Intelligence**
> **• Nutrition Analysis** 
</div>
<br/>
SmartPlatter AI (Meal-4-All) is a React + Vite based full-stack AI platform that transforms everyday grocery data into personalized, region-aware meal plans.
It bridges the gap between food availability, budgeting, and nutritional awareness using AI.

## 🌍 Problem Statement

Maintaining a balanced diet is difficult because people struggle with:

- Planning meals from available ingredients
- Managing grocery budgets
- Food waste
- Poor nutrition tracking daily intake
- Lack of regional & dietary personalization
- Confusion about calorie and nutrient intake
- Lack of knowledge about the nutrition requirements

SmartPlatter AI solves this by turning grocery bills and ingredients into AI-curated meal plans and nutrition insights.
Millions struggle daily with:

"Meal-4-All solves this intelligently using AI."

## 🌟 The Solutions

| Feature                    | What it Does                                                             |
| -------------------------- | ------------------------------------------------------------------------ |
| 🍲 AI Meal Generator       | Creates recipes from available ingredients with regional cuisine support |
| 🔁 Regeneration Engine     | Regenerate meals until user satisfaction                                 |
| 🧾 Grocery Bill Scanner    | Scan receipts → detect items → suggest meals & cost                      |
| 🥗 NutriScan               | Analyze calories & macros of cooked meals                                |
| 🧮 NutriCalculator         | Personalized daily nutrition based on body metrics                       |
| 📊 Meal Tracking & Reports | Track daily meals with weekly & monthly nutrition graphs                 |
| 💰 Cost Awareness          | Estimate meal cost for budget planning                                   |
| 🧠 Health Classification   | Classifies meals as Healthy / Moderate / Unhealthy                       |

## 🚀 Core Innovations

### 1️⃣ SmartPlatter — AI Meal Generator
🔍 Users enter:

- Available ingredients
- Number of family members
- Region/ cuisine preference

🎯 What it Delivers:

- Breakfast, Lunch & Dinner suggestions
- Estimated meal cost
- Personalized nutrition tips
- Regenerate option until satisfaction

### 2️⃣ Grocery Bill Scanner — Smart Budget + Waste Reduction

🧾 What It Does:
- Scans uploaded grocery bills
- Extracts purchased items
- Calculates total bill cost
- Categorizes ingredients into:
  Proteins,
  Carbohydrates,
  Fats,
  Calcium,
  Vegetables & Fruits (Minerals),
  Nutrition groups

🥗 Then It:
- Suggests dishes from purchased items
- Allows allergy filtering
- Reduces food waste
- Improves budget efficiency

### 3️⃣ NutriScan — Nutrition Intelligence Engine

Perfect for:

🏋️ Gym enthusiasts   

🥗 Health-conscious users    

📊 Diet planners

It Calculates:
- Calories
- Carbohydrates
- Proteins
- Fats
- Sugar
- Fiber
And provides: Healthy improvement tips

### 4️⃣ NutriCalculator — Personalized nutrition calculations
- Height, weight, age, gender, and activity level of the individual help to determine the nutrient values required for their body.

### 5️⃣ Report Analysis Dashboard

Track daily meals and get:

Healthy / Moderate / Unhealthy classification
Weekly & Monthly nutrient graphs
Average nutrition insights
Meal history storage

---

## 🛠️ Tech Stack
### Frontend

- React + Vite
- Tailwind CSS
- Modular component architecture
- Recharts (Data Visualization)
- Responsive design

### AI Integration

- Google AI Studio API
- Gemini-2.5-Flash model/ OpenAI APIs
- Prompt engineering for structured responses
- Regeneration logic handling

### Image & Data Processing
- OCR-based grocery bill parsing
- Nutrient segmentation logic

### Backend

- Node.js
- Express.js
- MongoDB

---
## 🧠 Engineering & Architecture

This project emphasizes:

✅ Clean folder structure

✅ Modular component design

✅ Scalable architecture

✅ API abstraction layer

✅ Demo dataset fallback for testing

✅ Error handling for production readiness

---
## 🧪 Challenges & Learnings

### 🔁 API Rate Limiting (429 Errors)

While integrating the Gemini API, frequent calls caused: 429 — Too Many Requests

### Solution:

- Added loading states
- Controlled regeneration calls
- Implemented demo fallback dataset
- Optimized prompt size
- Improved API request throttling

## 🎯 Impact

Meal-4-All:

- Reduces food waste
- Improves nutrition awareness
- Supports budget planning
- Makes cooking smarter
- Enhances regional inclusivity

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/your-username/smartplatter-ai.git

# Install frontend
cd frontend
npm install
npm run dev

# Install backend
cd backend
npm install
npm run dev
```

---
## 🔮 Future Improvements
Mobile app version
Wearable health integration
AI voice assistant for cooking
Social meal sharing

---
<div align="center">

  ## 👩‍💻 Built By
— Signing off with <b>Khushi Goyal</b> ✨

Full-Stack Developer | MERN | AI Integration
<br/>
( Sky is not the limit, Limit is in our vision! )
</div>
