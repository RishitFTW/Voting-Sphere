import React, { useState, useEffect } from "react";

const AdminPanel = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [parties, setParties] = useState([
    {
      _id: "1",
      name: "Democratic Alliance",
      symbol: "🌟",
      leader: "John Doe",
      foundedYear: 1990,
    },
    {
      _id: "2",
      name: "United Front",
      symbol: "🕊️",
      leader: "Jane Smith",
      foundedYear: 1985,
    },
    {
      _id: "3",
      name: "People's Party",
      symbol: "🔥",
      leader: "Alice Johnson",
      foundedYear: 2000,
    },
  ]);

  // Fetch all parties from the backend
  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch("/api/parties");
        if (!response.ok) {
          throw new Error("Failed to fetch parties");
        }
        const data = await response.json();
        setParties(data);
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };

    fetchParties();
  }, []);

  const moveSlider = (index) => {
    setSliderIndex(index);
  };

  // Handle delete party
  const deleteParty = (id) => {
    // Replace with your API endpoint for deleting a party
    fetch(`/api/parties/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setParties((prev) => prev.filter((party) => party._id !== id));
          alert("Party deleted successfully");
        } else {
          alert("Failed to delete the party");
        }
      })
      .catch((error) => console.error("Error deleting party:", error));
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
            Update Party
          </button>
          <button
            className={`${
              sliderIndex === 2 ? "bg-red-700" : "bg-red-600"
            } hover:bg-red-500 text-white px-6 py-2 rounded-full font-semibold`}
            onClick={() => moveSlider(2)}
          >
            Delete Party
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
          {sliderIndex === 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Create a New Party
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="createName"
                    className="block text-gray-300 mb-1"
                  >
                    Party Name
                  </label>
                  <input
                    type="text"
                    id="createName"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter party name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="createSymbol"
                    className="block text-gray-300 mb-1"
                  >
                    Party Symbol
                  </label>
                  <input
                    type="text"
                    id="createSymbol"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter party symbol"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="createLeader"
                    className="block text-gray-300 mb-1"
                  >
                    Party Leader
                  </label>
                  <input
                    type="text"
                    id="createLeader"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter leader's name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="createYear"
                    className="block text-gray-300 mb-1"
                  >
                    Founded Year
                  </label>
                  <input
                    type="number"
                    id="createYear"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter founded year"
                    required
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
                Update and Delete Parties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parties.map((party) => (
                  <div
                    key={party._id}
                    className="bg-gray-700 p-4 rounded-lg shadow-lg space-y-2"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {party.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Symbol: {party.symbol}
                    </p>
                    <p className="text-sm text-gray-400">
                      Leader: {party.leader}
                    </p>
                    <p className="text-sm text-gray-400">
                      Founded Year: {party.foundedYear}
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
                Delete Party by ID
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="deleteId"
                    className="block text-gray-300 mb-1"
                  >
                    Party ID
                  </label>
                  <input
                    type="text"
                    id="deleteId"
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter party ID"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded font-semibold transition duration-300"
                >
                  Delete Party
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
