import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50 to-green-100 px-4 text-center">

      {/* 404 Text */}
      <h1 className="text-6xl md:text-8xl font-extrabold text-green-600">
        404
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl md:text-3xl font-bold text-black">
        Oops! Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-2 text-[#6B4F3B] max-w-md">
        The page you are looking for doesn’t exist or might have been removed.
        Let’s get you back to something healthy 🌿
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">

        <Link
          to="/"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold shadow-md transition"
        >
          Go to Home
        </Link>

        <Link
          to="/nutri-calculator"
          className="px-6 py-3 border border-green-500 text-green-600 hover:bg-green-50 rounded-2xl font-semibold transition"
        >
          Try NutriCalculator
        </Link>

      </div>

      {/* Optional Illustration */}
      <div className="mt-10 text-6xl">
        🥗
      </div>

    </div>
  );
};

export default NoPage;