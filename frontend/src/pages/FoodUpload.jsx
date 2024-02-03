// client/src/components/CameraComponent.js
import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { saveAs } from 'file-saver';

const saveImage = (imageData, path) => {
  // Convert the base64 image data to a Blob
  const blob = base64ToBlob(imageData);

  // Save the Blob to the specified path using FileSaver.js
  saveAs(blob, path);
};

// Helper function to convert base64 to Blob
const base64ToBlob = (base64Data) => {
  const byteString = atob(base64Data.split(',')[1]);
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];

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

  const webcamRef = React.useRef(null);

  const openCamera = () => {
    setShowCamera(true);
  };

  const capture = useCallback(() => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const imageSrc = webcamRef.current.getScreenshot();
    const filename = `captured_image_${timestamp}.png`;
    const imagePath = `C:/Users/parth/Desktop/HeAlthIfy/Pixel_Pundits_GenAI/frontend/imagestore/${filename}`;
    saveImage(imageSrc, imagePath);
    setImagePath(imagePath);
    console.log(imagePath);
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
