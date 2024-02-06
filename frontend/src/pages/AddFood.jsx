import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const AddFood = () => {
  const [mealType, setMealType] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);
  const [foodData, setFoodData] = useState([]);

  const getFoodData = async () => {
    const foodIdArr = JSON.parse(localStorage.getItem("foodId"));

    try {
      const responses = await Promise.all(
        foodIdArr.map(async (foodId, index) => {
          const data = { food_id: foodId };
          return await axios.post(
            "http://localhost:5000/api/foods/getInfo",
            data
          );
        })
      );

      const foodData = responses.map((response) => response.data);
      setFoodData(foodData);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const handleMealTypeChange = (e) => {
    setMealType(e.target.value);
  };

  const handleSave = () => {
    // Your logic to save the mealType and handle the photoAdded state
    if (photoAdded) {
      console.log(`Meal Type saved: ${mealType}`);
      // Reset the mealType state after saving if needed
      // setMealType('');
    } else {
      alert("Please add a photo before saving.");
    }
  };

  const handlePhotoAdded = () => {
    setPhotoAdded(true);
  };

  useEffect(() => {
    getFoodData();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="flex justify-center text-3xl font-bold text-blue-900 mb-4">
        Add your meal
      </h1>

      <div className="mb-4">
        <label
          htmlFor="mealType"
          className="block text-gray-700 font-bold mb-1"
        >
          Type of Meal
        </label>
        <input
          type="text"
          id="mealType"
          className="border-2 border-blue-500 rounded-md px-3 py-2 w-40%"
          placeholder="eg. Breakfast, Lunch"
          value={mealType}
          onChange={handleMealTypeChange}
        />
      </div>
      <div className=" mb-4">
        <Link to={`/FoodUpload?mealType=${encodeURIComponent(mealType)}`}>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ml-2 ${
              photoAdded ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handlePhotoAdded}
            disabled={photoAdded}
          >
            {/* Camera Icon */}
            📷 Add Photo
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodData.map((foodItem, index) =>
          foodItem ? (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex justify-evenly gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{foodItem.name}</h2>
                  <p className="text-gray-600">
                    Serving Size: {foodItem.servingSize}
                  </p>
                  {/* Render other properties as needed */}
                  <p className="text-green-600">
                    Protein: {foodItem.macronutrients.protein}
                  </p>
                </div>
                <div className="flex ">
                  <p className="text-blue-600">
                    Carbs:{foodItem.macronutrients.carbs}
                  </p>
                </div>
                <div>
                  <p className="text-yellow-600">
                    Sugar:{foodItem.macronutrients.sugar}
                  </p>
                </div>
              </div>
              <p className=" text-red-500">
                Note Allergens: {foodItem.allergens}
              </p>
            </div>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>

      <button
        className={`bg-green-500 text-white px-6 py-3 rounded-md  ${
          !photoAdded ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handleSave}
        disabled={!photoAdded || !mealType} // Disable the button if photo is not added or mealType is empty
      >
        Save
      </button>
    </div>
  );
};

export default AddFood;
