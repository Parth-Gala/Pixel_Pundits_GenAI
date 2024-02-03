import React, { useState } from 'react';
import axios from 'axios';

const AddMeal = () => {
  const [pythonOutput, setPythonOutput] = useState('');
  const [pythonError, setPythonError] = useState('');
  const [loading, setLoading] = useState(false);


  const removeUnwantedPart = (output) => {
    // Remove the specified sentence
    const modifiedOutput = output.replace(/__Secure-1PSID value should end with a single dot\.Enter correct __Secure-1PSID value\./g, '');
  
    return modifiedOutput;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/foods/identifyFood');
      const modifiedOutput = removeUnwantedPart(response.data.output);
      setPythonOutput(modifiedOutput);
      console.log(modifiedOutput)
      setPythonError('');
    } catch (error) {
      setPythonOutput('');
      setPythonError('An error occurred while running the Python script.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>Run Python Script</button>
      </form>

      <div>
        {loading && <p>Loading...</p>}
        <p>Python Output: {pythonOutput}</p>
        <p style={{ color: 'red' }}>Python Error: {pythonError}</p>
      </div>
    </div>
  );
};

export default AddMeal;
