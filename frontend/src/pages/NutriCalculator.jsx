import React, { useState } from "react";

const NutriCalculator = () => {
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "male",
    activity: "1.2",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.age || form.age < 1) {
      newErrors.age = "Age must be at least 1 year";
    }

    if (!form.height) {
      newErrors.height = "Height is required";
    } else if (form.height < 91.44 || form.height > 274.32) {
      newErrors.height =
        "Height must be between 91.44 cm and 274.32 cm (3ft – 9ft)";
    }

    if (!form.weight) {
      newErrors.weight = "Weight is required";
    } else if (form.weight < 5) {
      newErrors.weight = "Weight must be at least 5 kg";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validate()) return;

    const { age, height, weight, gender, activity } = form;

    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : gender === "female"
        ? 10 * weight + 6.25 * height - 5 * age - 161
        : 10 * weight + 6.25 * height - 5 * age - 78;

    const calories = bmr * activity;

    const protein = weight * 1.8;
    const fats = weight * 0.9;
    const carbs = (calories - (protein * 4 + fats * 9)) / 4;

    const water = weight * 0.035;
    const waterLiters = weight * 0.035; // liters
    const glasses = waterLiters / 0.25;
    const calcium = 1000;
    
    setResult({
        calories: Math.round(calories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fats: Math.round(fats),
        waterLiters: waterLiters.toFixed(2),
        glasses: Math.round(glasses),
        calcium,
        vitamins: "Balanced intake of fruits & vegetables required",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 px-4 py-10">

      {/* 🔥 HEADING */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          NutriCalculator
        </h1>
        <p className="text-sm text-[#6B4F3B] mt-1 max-w-xl mx-auto">
          It helps to calculate the nutrients intake in individual's diet on daily basis as per their customizations
        </p>
      </div>

      {/* 🌿 FORM */}
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-green-100 rounded-3xl p-5 md:p-7 shadow-xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* AGE */}
          <div>
            <label className="labelTop">Age (years) — 1 year onwards *</label>
            <input
              type="number"
              min="1"
              required
              placeholder="Enter your age"
              className="inputPremium"
              onChange={(e) => handleChange("age", +e.target.value)}
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          {/* GENDER */}
          <div>
            <label className="labelTop">Gender *</label>
            <select
              className="inputPremium"
              required
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Trans-gender</option>
            </select>
          </div>

          {/* HEIGHT */}
          <div>
            <label className="labelTop">
              Height (cm) — 91.44 to 274.32 *
            </label>
            <input
              type="number"
              min="91.44"
              max="274.32"
              step="0.01"
              required
              placeholder="e.g. 170"
              className="inputPremium"
              onChange={(e) => handleChange("height", +e.target.value)}
            />
            {errors.height && <p className="error">{errors.height}</p>}
          </div>

          {/* WEIGHT */}
          <div>
            <label className="labelTop">
              Weight (kg) — min 5kg *
            </label>
            <input
              type="number"
              min="5"
              required
              placeholder="e.g. 65"
              className="inputPremium"
              onChange={(e) => handleChange("weight", +e.target.value)}
            />
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>

          {/* ACTIVITY */}
          <div className="md:col-span-2">
            <label className="labelTop">Activity Level (Optional)</label>
            <select
              className="inputPremium"
              onChange={(e) => handleChange("activity", +e.target.value)}
            >
              <option value="1.2">Sedentary (little/no exercise)</option>
              <option value="1.375">Light (1–3 days/week)</option>
              <option value="1.55">Moderate (3–5 days/week)</option>
              <option value="1.725">Active (6–7 days/week)</option>
            </select>
          </div>

        </div>

        {/* BUTTON */}
        <button 
          onClick={calculate} // Ensure the function is called on click
          disabled={!form.age || !form.height || !form.weight} // Disable if any field is empty
          className={`w-full mt-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition duration-300 
            ${(!form.age || !form.height || !form.weight) 
            ? "bg-gray-300 cursor-not-allowed text-gray-500" 
            : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white"
            }`}
        >
          Calculate Nutrients
        </button>

        {/* 🌿 RESULT */}
        {result && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-5">

            <div className="resultCard">
              <p className="label">Calories</p>
              <p className="value">{result.calories} kcal</p>
            </div>

            <div className="resultCard">
              <p className="label">Carbohydrates</p>
              <p className="value">{result.carbs} g</p>
            </div>

            <div className="resultCard">
              <p className="label">Protein</p>
              <p className="value">{result.protein} g</p>
            </div>

            <div className="resultCard">
              <p className="label">Fats</p>
              <p className="value">{result.fats} g</p>
            </div>

            <div className="resultCard">
              <p className="label">Calcium</p>
              <p className="value">{result.calcium} mg</p>
            </div>

            <div className="resultCard">
                <p className="label">Water Intake</p>
                <p className="value">
                    {result.waterLiters} L
                </p>
                <p className="text-xs text-[#6B4F3B] mt-1">
                    ≈ {result.glasses} glasses
                </p>
            </div>

            <div className="resultCard md:col-span-3">
              <p className="label">Vitamins & minerals</p>
              <p className="value text-sm">
                {result.vitamins}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default NutriCalculator;