import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/data', { description, image });
      setDataList([...dataList, response.data]);
      setDescription('');
      setImage('');
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('Failed to submit data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Data</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
      <div className="mt-8 w-full max-w-md">
        {dataList.map((data, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <p className="mb-2">{data.description}</p>
            <img src={data.image} alt="User uploaded" className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
