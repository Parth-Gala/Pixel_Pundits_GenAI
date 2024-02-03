import React, { useState, useEffect } from "react";
import useFetch from '../hooks/useFetch.jsx';
import axios from "axios";
import { Link } from "react-router-dom";

const AddFood = () => {
  const [mealType, setMealType] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);
  const [foodData, setFoodData] = useState([]);

  const getFoodData = async () => {
    const foodIdArr = JSON.parse(localStorage.getItem("foodId"));
    
    try {
        const responses = await Promise.all(foodIdArr.map(async (foodId, index) => {
            const data = { "food_id": foodId };
            return await axios.post("http://localhost:5000/api/foods/getInfo", data);
        }));

        const foodData = responses.map(response => response.data);
        setFoodData(foodData);
    } catch (error) {
        console.error("Error fetching food data:", error);
    }
  }

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
    getFoodData()
  }, []);

  return (
    
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Add your meal</h1>

      <div className="mb-4">
        <label
          htmlFor="mealType"
          className="block text-gray-700 font-bold mb-2"
        >
          Type of Meal
        </label>
        <input
          type="text"
          id="mealType"
          className="border-2 border-blue-500 rounded-md px-3 py-2 w-full"
          placeholder="Enter your meal type"
          value={mealType}
          onChange={handleMealTypeChange}
        />
      </div>

      {foodData.map((foodItem, index) => (
        (foodItem ? <div key={index}>
            <h2>{foodItem.name}</h2>
            <p>Serving Size: {foodItem.servingSize}</p>
            {/* Render other properties as needed */}
          </div> : <div></div>
        )
      ))}

      <div className="flex items-center mb-4">
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

      <button
        className={`bg-green-500 text-white px-6 py-3 rounded-md ${
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
