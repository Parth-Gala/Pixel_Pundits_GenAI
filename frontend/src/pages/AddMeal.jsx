import React, { useState } from "react";
import axios from "axios";

const AddMeal = () => {
  const [pythonOutput, setPythonOutput] = useState("");
  const [pythonOutput2, setPythonOutput2] = useState("");
  const [pythonError, setPythonError] = useState("");
  const [pythonError2, setPythonError2] = useState("");
  const [loading, setLoading] = useState(false);
  const [servingQuantity, setServingQuantity] = useState("");
  const [dish_name, setdish_name] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/foods/identifyFood"
      );
      const lines = response.data.output.split("\n");
      const dishLine = lines.find((line) => line.includes("Dish:"));

      // Extract the content after "Dish:" from the found line
      const dishInfo = dishLine ? dishLine.split("Dish:")[1].trim() : "";
      const get_dish_name = response.data.output;
      setdish_name(get_dish_name);
      //   console.log(modifiedOutput)
      setPythonError("");
    } catch (error) {
      setPythonOutput("");
      setPythonError("An error occurred while running the Python script.");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    // You can make another axios request here to run the second Python script
    // and display the final output.

    try {
      console.log(dish_name);
      console.log(servingQuantity);
      const data = {
        foodname: dish_name,
        servingsize: servingQuantity,
      };
      const saveResponse = await axios.post(
        "http://localhost:5000/api/foods/nutrition",
        data
      );
      console.log(saveResponse.data);
      // Assuming your backend returns the final output
      setPythonOutput2(saveResponse.data.finalOutput);
      setPythonError2("");
    } catch (error) {
      setPythonOutput2("");
      setPythonError2("An error occurred while saving the meal.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "8px",
          border: "none",
          borderRadius: "4px",
          width: "120px",
          height: "40px",
        }}
      >
        <button type="submit" disabled={loading}>
          Run Python Script
        </button>
      </form>

      <div>
        {loading && <p>Loading...</p>}
        <p>Python Output: {pythonOutput}</p>
        <p style={{ color: "red" }}>Python Error: {pythonError}</p>
      </div>
      <div>
        <label>
          Serving Quantity (grams):
          <input
            type="number"
            value={servingQuantity}
            onChange={(e) => setServingQuantity(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={handleSave}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "8px",
            border: "none",
            borderRadius: "4px",
            marginTop: "10px",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddMeal;
