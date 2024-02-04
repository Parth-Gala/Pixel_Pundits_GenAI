// src/components/Register.jsx

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    personalInformation: {
      height: "",
      weight: "",
      neck: "",
      waist: "",
      
    },
    activityLevel: "",
    foodPreference: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
    goals: {
      goalType: "",
    },
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "goalType") {
      let targetWeight;
      let targetCalories;
      if(credentials.goals.goalType === "Weight Loss" || credentials.goals.goalType === "Burn Fat"){
        targetWeight = getRandomNumber(Number(credentials.personalInformation.weight) - 15, Number(credentials.personalInformation.weight) - 7);
        targetCalories = getRandomNumber(1500, 1900);
      }
      else{
        targetWeight = getRandomNumber(Number(credentials.personalInformation.weight) + 7, Number(credentials.personalInformation.weight) + 15);
        targetCalories = getRandomNumber(2250, 3100);
      }
      setCredentials((prev) => ({
        ...prev,
        goals: { ...prev.goals, [id]: value,  targetWeight: targetWeight, targetCalories: targetCalories},
      }));
    } else if (
      id === "height" ||
      id === "weight" ||
      id === "neck" ||
      id === "waist"
    ) {
      setCredentials((prev) => ({
        ...prev,
        personalInformation: { ...prev.personalInformation, [id]: value },
      }));
    } else if (
      id === "allergies" ||
      id === "medications" ||
      id === "medicalHistory"
    ) {
      setCredentials((prev) => ({
        ...prev,
        [id]: value,
      }));
    } else {
      setCredentials((prev) => ({ ...prev, [id]: value }));
    }
  };

  const setGoals = () => {
    // let targetWeight;
    // let targetCalories;
    // if(credentials.goals.goalType === "Weight Loss" || credentials.goals.goalType === "Burn Fat"){
    //   targetWeight = getRandomNumber(Number(credentials.personalInformation.weight) - 15, Number(credentials.personalInformation.weight) - 7);
    //   targetCalories = getRandomNumber(1500, 1900);
    // }
    // else{
    //   targetWeight = getRandomNumber(Number(credentials.personalInformation.weight) + 7, Number(credentials.personalInformation.weight) + 15);
    //   targetCalories = getRandomNumber(2250, 3100);
    // }

    // setCredentials((prev) => ({
    //   ...prev,
    //   goals: {
    //     targetWeight:credentials.goals.targetWeight,
    //     targetCalories: credentials.goals.targetCalories
    //   }
    // }));
  }

  const handleClickNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleClickBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleClickCreateAccount = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      console.log("Credentials before request:", credentials);
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        credentials
      );
      Cookies.set("username", credentials.username);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#D1EDF2",
        height: "720px",
        overflow: "hidden",
      }}
      className=" w-full  px-4"
    >
      <div
        style={{ marginBottom: "40px" }}
        className="flex flex-col items-center justify-center"
      >
        <img src={logo} alt="Panda" className="w-32 h-32" />
        {error && (
          <span className="text-red-500 text-center">{error.message}</span>
        )}
        <div
          style={{ marginTop: "30px" }}
          className="bg-white rounded-xl shadow-lg lg:w-1/3 md:w-1/2 w-full p-10 "
        >
          {step === 1 && (
            <div>
              <label
                id="username"
                className="text-sm font-medium leading-none text-gray-800"
              >
                Name
              </label>
              <input
                aria-labelledby="username"
                type="text"
                class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                onChange={handleChange}
                id="username"
              />
              <label
                id="email"
                class="text-sm font-medium leading-none text-gray-800"
              >
                Email
              </label>
              <input
                aria-labelledby="email"
                type="email"
                id="email"
                onChange={handleChange}
                class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              {/* jhdjhdhd */}
              <label
                for="password"
                class="text-sm font-medium leading-none text-gray-800"
              >
                Password
              </label>
              <div class="relative flex items-center justify-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  onChange={handleChange}
                />
                <div
                  class="absolute right-0 mt-2 mr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                      fill="#71717A"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label
                className="block text-sm font-medium leading-none text-gray-800"
                id="gender"
              >
                Gender
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={credentials.gender === "male"}
                    onChange={handleChange}
                    id="gender"
                    className="bg-gray-200 border-gray-300 text-indigo-600 rounded focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={credentials.gender === "female"}
                    onChange={handleChange}
                    id="female"
                    className="bg-gray-200 border-gray-300 text-indigo-600 rounded focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    id="other"
                    checked={credentials.gender === "other"}
                    onChange={handleChange}
                    className="bg-gray-200 border-gray-300 text-indigo-600 rounded focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
              <div className="mt-3 w-full">
                <label
                  className="block text-sm font-medium leading-none text-gray-800"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  onChange={handleChange}
                  className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
              </div>

              <div className="mt-3 w-full">
                <label
                  className="block text-sm font-medium leading-none text-gray-800"
                  htmlFor="height"
                >
                  Height (in cm)
                </label>
                <input
                  type="number"
                  id="height"
                  value={credentials.personalInformation.height}
                  onChange={handleChange}
                  className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
              </div>

              <div className="mt-3 w-full">
                <label
                  className="block text-sm font-medium leading-none text-gray-800"
                  htmlFor="weight"
                >
                  Weight (in kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={credentials.personalInformation.weight}
                  onChange={handleChange}
                  className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <label className="block text-sm font-medium leading-none text-gray-800">
                Goal Type
              </label>
              <div className="mt-2 relative">
                <select
                  aria-labelledby="goalType"
                  id="goalType"
                  value={credentials.goals.goalType}
                  onChange={handleChange}
                  className="bg-gray-200 border text-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 sm:text-sm overflow-hidden"
                >
                  <option value="">Select Goal Type</option>
                  <option value="Burn Fat">Burn Fat</option>
                  <option value="Increase endurance">Increase Endurance</option>
                  <option value="Relieve Stress">Relieve Stress</option>
                  <option value="Improve Fitness">Improve Fitness</option>
                  <option value="Build Muscle">Build Muscle</option>
                  <option value="Weight gain">Weight Gain</option>
                  <option value="Weight Loss">Weight Loss</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <label className="block text-sm font-medium leading-none text-gray-800">
                Activity Level
              </label>
              <div className="mt-2 relative">
                <select
                  aria-labelledby="activityLevel"
                  value={credentials.activityLevel}
                  onChange={handleChange}
                  className="bg-gray-200 border text-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 sm:text-sm"
                  id="activityLevel"
                >
                  <option value="" id="activityLevel">
                    Select Activity Level
                  </option>
                  <option value="Sedentary" id="activityLevel">
                    Sedentary
                  </option>
                  <option value="Lightly Active" id="activityLevel">
                    Lightly Active
                  </option>
                  <option value="Moderately Active" id="activityLevel">
                    Moderately Active
                  </option>
                  <option value="Very Active" id="activityLevel">
                    Very Active
                  </option>
                  <option value="Extra Active" id="activityLevel">
                    Extra Active
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label
                className="block text-sm font-medium leading-none text-gray-800"
                htmlFor="waist"
              >
                Waist (in cm)
              </label>
              <input
                type="number"
                id="waist"
                value={credentials.personalInformation.waist}
                onChange={handleChange}
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              <label
                className="block text-sm font-medium leading-none text-gray-800"
                htmlFor="neck"
              >
                Neck Circumference (in cm)
              </label>
              <input
                type="number"
                id="neck"
                value={credentials.personalInformation.neck}
                onChange={handleChange}
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              
            </div>
          )}
          {step === 4 && (
            <div>
              <label
                className="block text-sm font-medium leading-none text-gray-800"
                htmlFor="dietaryPreference"
              >
                Dietary Preference
              </label>
              <select
                id="foodPreference"
                value={credentials.foodPreference}
                onChange={handleChange}
                className="bg-gray-200 border text-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 sm:text-sm"
              >
                <option value="" id="foodPreference">
                  Select Dietary Preference
                </option>
                <option value="Veg" id="foodPreference">
                  Vegetarian
                </option>
                <option value="NonVeg" id="foodPreference">
                  Non-vegetarian
                </option>
              </select>
              <label
                className="block text-sm font-medium leading-none text-gray-800"
                htmlFor="allergies"
              >
                Any Allergies
              </label>
              <input
                type="text"
                id="allergies"
                value={credentials.allergies}
                onChange={handleChange}
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              <label
                className="block text-sm font-medium leading-none text-gray-800"
                htmlFor="medications"
              >
                Any Medications
              </label>
              <input
                type="text"
                id="medications"
                value={credentials.medications}
                onChange={handleChange}
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              <label
                className="block text-sm font-medium leading-none text-gray-800"
                htmlFor="hereditaryHistory"
              >
                Hereditary History
              </label>
              <input
                type="text"
                id="medicalHistory"
                value={credentials.medicalHistory}
                onChange={handleChange}
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            {step > 1 && (
              <button
                onClick={handleClickBack}
                className="text-sm text-gray-500"
              >
                Back
              </button>
            )}

            {step < 5 && (
              <button
                onClick={handleClickNext}
                className="text-sm text-gray-500"
              >
                Next
              </button>
            )}

            {step === 5 && (
              <button
                onClick={handleClickCreateAccount}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white bg-indigo-700 border rounded hover:bg-indigo-600 py-4"
                disabled={loading}
              >
                Create My Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
