// SuggestedDiet.jsx
import React from "react";

const SuggestedDiet = () => {
  console.log(localStorage.getItem("userinfo"));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-blue-500 mb-8">
        Suggested Diet made for you by Healthify
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Breakfast Card */}
        <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Breakfast</h2>
          <img
            src="" // Replace with your dish image URL
            alt="Breakfast"
            className="w-24 h-24 object-cover rounded-full mb-2"
          />
          <p className="text-center mb-1">Dish Name</p>
          <div className="flex space-x-2">
            <button className="border border-black font-bold px-2 py-1">
              Recipe
            </button>
            <button className="border border-black font-bold px-2 py-1">
              Nutrients
            </button>
          </div>
        </div>

        {/* Lunch Card */}
        <div
          style={{ width: "280px" }}
          className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center"
        >
          <h2 className="text-lg font-bold mb-2">Lunch</h2>
          <img
            src="" // Replace with your dish image URL
            alt="Lunch"
            className="w-24 h-24 object-cover rounded-full mb-2"
          />
          <p className="text-center mb-1">Dish Name</p>
          <div className="flex space-x-2">
            <button className="border border-black font-bold px-2 py-1">
              Recipe
            </button>
            <button className="border border-black font-bold px-2 py-1">
              Nutrients
            </button>
          </div>
        </div>

        {/* Dinner Card */}
        <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Dinner</h2>
          <img
            src="" // Replace with your dish image URL
            alt="Dinner"
            className="w-24 h-24 object-cover rounded-full mb-2"
          />
          <p className="text-center mb-1">Dish Name</p>
          <div className="flex space-x-2">
            <button className="border border-black font-bold px-2 py-1">
              Recipe
            </button>
            <button className="border border-black font-bold px-2 py-1">
              Nutrients
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedDiet;
