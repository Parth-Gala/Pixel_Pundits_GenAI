// SuggestedDiet.jsx
import React, { useEffect, useState } from "react";

const replaceText = (fullName) => {
  return fullName.split('(')[0].trim();
}

const SuggestedDiet = () => {
  const [diet, setDiet] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const dietRecommendation = userInfo.dietRecommendation;
  console.log(dietRecommendation[replaceText]);
  // console.log(userInfo);
  // setDiet(dietRecommendation);

  const dietInfo = (dietRecommendation) => {
    setDiet(dietRecommendation);
  }

  useEffect(() => {
    dietInfo(dietRecommendation);
  }, []);

  // Log the extracted dietRecommendation
//   console.log(dietRecommendation);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-blue-500 mb-8">
        Suggested Diet made for you by Healthify
        {/* {userInfo.data.dietRecommendation} */}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          {Object.entries(diet).slice(0, 4).map(([mealCategory, foods]) => (
            <div key={mealCategory} className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center mb-3">
              <h2 className="text-lg font-bold mb-2">{mealCategory}</h2>
              <p className="text-center mb-1">Food Dishes:</p>
              <ul className="text-center mb-1">
                {foods.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
              <div className="flex space-x-2">
              <button className="border border-black font-bold px-2 py-1">
                Recipe
              </button>
              <button className="border border-black font-bold px-2 py-1">
                Nutrients
              </button>
            </div>
              </div>
          ))};
        </div>
        {/* Breakfast Card */}
        {/* <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Breakfast</h2>

          <p className="text-center mb-1">Dish Name: {diet[0]}</p>
          <div className="flex space-x-2">
            <button className="border border-black font-bold px-2 py-1">
              Recipe
            </button>
            <button className="border border-black font-bold px-2 py-1">
              Nutrients
            </button>
          </div>
        </div> */}

        {/* Lunch Card */}
        {/* <div
          style={{ width: "280px" }}
          className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center"
        >
          <h2 className="text-lg font-bold mb-2">Lunch</h2>

          <p className="text-center mb-1">Dish Name</p>
          <div className="flex space-x-2">
            <button className="border border-black font-bold px-2 py-1">
              Recipe
            </button>
            <button className="border border-black font-bold px-2 py-1">
              Nutrients
            </button>
          </div>
        </div> */}

        {/* Dinner Card */}
        {/* <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Dinner</h2>

          <p className="text-center mb-1">Dish Name</p>
          <div className="flex space-x-2">
            <button className="border border-black font-bold px-2 py-1">
              Recipe
            </button>
            <button className="border border-black font-bold px-2 py-1">
              Nutrients
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SuggestedDiet;
