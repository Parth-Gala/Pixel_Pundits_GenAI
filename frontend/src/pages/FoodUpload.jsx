// client/src/components/CameraComponent.js
import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const FoodUpload = () => {
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const webcamRef = React.useRef(null);

  const openCamera = () => {
    setShowCamera(true);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowCamera(false); // Close the camera after capturing
  }, [webcamRef]);

  const uploadImage = async () => {
    // Send the captured image to the server
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    });

    const data = await response.json();
    console.log(data); // Handle the server response accordingly
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
          <Webcam ref={webcamRef} />
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
    </div>
  );
};

export default FoodUpload;
