// SuggestedDiet.jsx
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCross } from "react-icons/fa";
import Modal from "react-modal";
const replaceText = (fullName) => {
  return fullName.split('(')[0].trim();
}

const SuggestedDiet = () => {
  const [diet, setDiet] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const dietRecommendation = userInfo.dietRecommendation;
  // console.log(dietRecommendation[replaceText]);
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
const handleRecipeClick = (videoId) => {
  setSelectedVideoId(videoId);
};

const closeModal = () => {
  setSelectedVideoId(null);
};

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
              <p className="text-center mb-1 bg-violet-400 p-1 rounded-xl">Food Dishes</p>
              <ul className="text-center mb-1">
                {foods.map((food, index) => (
                  <li key={index} className=" ">{food}</li>
                ))}
              </ul>
              <div className="flex space-x-2">
              <button className="border border-black font-bold px-2 py-1 rounded-xl" onClick={() => handleRecipeClick("PFG1aeYgi7c")}>
                Recipe
              </button>
              <button className="border border-black font-bold px-2 py-1 rounded-xl">
                Nutrients
              </button>
            </div>
              </div>
          ))};
        </div>
      </div>
      <Modal
        isOpen={selectedVideoId !== null}
        onRequestClose={closeModal}
        contentLabel="YouTube Video Modal"
        ariaHideApp={false}
      >
        {selectedVideoId && (
          <iframe
            title="YouTube Video"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            allowFullScreen
          ></iframe>
        )}
        <button onClick={closeModal}><FaArrowLeft className=" text-2xl font-medium"/></button>
      </Modal>
    </div>
  );
};

export default SuggestedDiet;
