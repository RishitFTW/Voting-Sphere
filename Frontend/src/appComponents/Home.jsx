import React from "react";

function Home() {
  // Example data (array of party objects)
  const parties = [
    { partyName: "Party A", votes: 123456 },
    { partyName: "Party B", votes: 789012 },
    { partyName: "Party C", votes: 345678 },
    // Add more parties here...
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center py-12">
      <div className="flex flex-col space-y-8 max-w-xl mx-auto">
        {/* Render cards dynamically */}
        {parties.map((party, index) => (
          <div
            key={index}
            className="max-w-sm rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r from-gray-700 via-gray-800 to-black p-6 transform transition duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-6">
              {/* Profile Picture Section */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt={`${party.partyName} Profile Picture`}
                />
              </div>

              {/* Party Name and Vote Count */}
              <div className="flex flex-col justify-center text-white">
                <div className="text-2xl font-bold mb-2">{party.partyName}</div>
                <p className="text-lg font-medium">
                  <span className="text-yellow-300">Votes:</span>{" "}
                  <span className="font-semibold">{party.votes.toLocaleString()}</span>
                </p>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-end p-4">
              <button className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md focus:outline-none transform transition duration-200 hover:scale-105">
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
