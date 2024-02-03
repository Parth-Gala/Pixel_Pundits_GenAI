// client/src/components/CameraComponent.js
import React, { useState, useCallback } from "react";
import Webcam from "react-webcam";
import { saveAs } from "file-saver";
import axios from "axios";

const saveImage = (imageData, path) => {
  // Convert the base64 image data to a Blob
  const blob = base64ToBlob(imageData);

  // Save the Blob to the specified path using FileSaver.js
  saveAs(blob, path);
};

// Helper function to convert base64 to Blob
const base64ToBlob = (base64Data) => {
  const byteString = atob(base64Data.split(",")[1]);
  const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

const FoodUpload = () => {
  const [image, setImagePath] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [pythonOutput2, setPythonOutput2] = useState("");
  const [pythonError2, setPythonError2] = useState("");
  const [servingQuantity, setServingQuantity] = useState("");
  const [dish_name, setdish_name] = useState("");

  const webcamRef = React.useRef(null);

  const openCamera = () => {
    setShowCamera(true);
  };

  const capture = useCallback(async () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const imageSrc = webcamRef.current.getScreenshot();
    const filename = `captured_image_${timestamp}.png`;
    const imagePath = `${filename}`;
    saveImage(imageSrc, imagePath);
    setImagePath(imagePath);
    console.log(imagePath);
    setShowCamera(false);
    const data = {
      fileName: filename,
    };
    const response = await axios.post(
      "http://localhost:5000/api/foods/identifyFood",
      data
    );
    console.log(response.data.output);
    setdish_name(response.data.output);
    // console.log(response.data);
    // const lines = response.data.output.split("\n");
    // const dishLine = lines.find((line) => line.includes("Dish:"));

    // const dishInfo = dishLine ? dishLine.split("Dish:")[1].trim() : "";
    // const get_dish_name = response.data.output;
  }, [webcamRef]);

  const uploadImage = async () => {
    // Send the captured image to the server
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    const data = await response.json();
    console.log(data); // Handle the server response accordingly
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
    <div className="max-w-md mx-auto my-8">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={openCamera}
      >
        Open Camera
      </button>
      {showCamera && (
        <div>
          <Webcam
            ref={webcamRef}
            videoConstraints={{
              facingMode: "environment",
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            onClick={capture}
          >
            Capture Photo
          </button>
        </div>
      )}
      {image && (
        <div>
          <img src={image} alt="Captured" className="mt-2" />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            onClick={uploadImage}
          >
            Upload Image
          </button>
        </div>
      )}
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

export default FoodUpload;
