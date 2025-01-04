import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AdminPanel = ({admin}) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [parties, setParties] = useState([]);
  const [formData, setformData] = useState({});
  const [ reload, setReload]= useState(0);
  const navigate= useNavigate();


  useEffect(() => {
    const fetchParties = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/signup');
          return;
        }
        if(!admin){
          navigate('/home');
        }
        // const tokenResponse = await fetch('http://localhost:4000/user/profile', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // });
        // const tokenData= await tokenResponse.json();
        // if(tokenData.data.role!=='admin'){
        //   navigate('/home');
        //   return;
        // }
        const response = await fetch("http://localhost:4000/candidate/");
        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || "Something went wrong"}`);
          return;
        }
        const data = await response.json();
        console.log(data.CANDIDATES);
        setParties(data.CANDIDATES);
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };

    fetchParties();
  }, [reload]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData({ ...formData, [id]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { id, ...dataWithoutId } = formData;
    try {
      
      const method = sliderIndex === 0 ? "POST" : "PUT";
      const URL =
        sliderIndex === 0
          ? "http://localhost:4000/candidate/"
          : `http://localhost:4000/candidate/${formData.id}`;

          const response= await fetch(URL,{
            method,
            headers:{
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sliderIndex === 0 ? dataWithoutId : formData),
          })

          if(!response.ok){
            const errorData= await response.json();
            alert(`Error: ${errorData.error || "Something went wrong"}`);
            return;
          }
          alert("Party created/updated successfully!");
          setformData({});
          setReload(prev=prev+1);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create/update party');
    }
  };

  // Fetch all parties from the backend


  const moveSlider = (index) => {
    setSliderIndex(index);
  };

  // Handle delete party
  const deleteParty = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/candidate/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setParties((prev) => prev.filter((party) => party._id !== id));
        alert("Party deleted successfully");
      } else {
        alert("Failed to delete the party");
      }
    } catch (error) {
      console.error("Error deleting party:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 flex justify-center items-center p-6">
      {/* Admin Section */}
      <div className="max-w-5xl w-full bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Admin Panel - Manage Parties
        </h1>

        {/* Slider Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`${
              sliderIndex === 0 ? "bg-blue-700" : "bg-blue-600"
            } hover:bg-blue-500 text-white px-6 py-2 rounded-full font-semibold`}
            onClick={() => moveSlider(0)}
          >
            Create Party
          </button>
          <button
            className={`${
              sliderIndex === 1 ? "bg-yellow-700" : "bg-yellow-600"
            } hover:bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold`}
            onClick={() => moveSlider(1)}
          >
            Delete Party
          </button>
          <button
            className={`${
              sliderIndex === 2 ? "bg-red-700" : "bg-red-600"
            } hover:bg-red-500 text-white px-6 py-2 rounded-full font-semibold`}
            onClick={() => moveSlider(2)}
          >
            Update Party
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
          {sliderIndex === 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Create a New Party
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="party" className="block text-gray-300 mb-1">
                    Party Name
                  </label>
                  <input
                    type="text"
                    id="party"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter party name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-1">
                    Party Leader
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter leader's name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-gray-300 mb-1">
                    Leader Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter leader age"
                    required
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-semibold transition duration-300"
                >
                  Create Party
                </button>
              </form>
            </div>
          )}

          {sliderIndex === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Delete Parties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parties.map((party) => (
                  <div
                    key={party._id}
                    className="bg-gray-700 p-4 rounded-lg shadow-lg space-y-2"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {party.party}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Leader: {party.name}
                    </p>
                    <button
                      onClick={() => deleteParty(party._id)}
                      className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded font-semibold transition duration-300"
                    >
                      Delete Party
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sliderIndex === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Update the Party
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="party" className="block text-gray-300 mb-1">
                    Party Name
                  </label>
                  <input
                    type="text"
                    id="party"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter party name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-1">
                    Party Leader
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter leader's name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-gray-300 mb-1">
                    Leader Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter leader age"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="id" className="block text-gray-300 mb-1">
                    Party ID
                  </label>
                  <input
                    type="text"
                    id="id"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter Party id"
                    required
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-semibold transition duration-300"
                >
                  Update Party
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
