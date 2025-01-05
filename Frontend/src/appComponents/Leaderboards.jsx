import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Leaderboards() {
  const navigate = useNavigate();
  const [Parties, setParties] = useState([]);
  const [Reload, setReload] = useState(0);

  const sortedResponse = [...Parties].sort((a, b) => {
    if (b.voteCount > a.voteCount) return 1;
    if (b.voteCount < a.voteCount) return -1;
    return 0;
  });

  useEffect(() => {
    const voteData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/candidate/vote/count"
        );
        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || "Something went wrong"}`);
          return;
        }
        const responseData = await response.json();
        setParties(responseData.response);
      } catch (error) {
        console.log("Parties data not returned");
      }
    };
    voteData();
  }, [Reload]);

  const handleVote = async (candidateID) => {
    try {
      const token = localStorage.getItem("authToken");
      if(!token){
        alert('You are not authorized to vote');
        return;
      }

      const response = await fetch(
        `http://localhost:4000/candidate/vote/${candidateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Something went wrong"}`);
        return;
      }

      const responseData = await response.json();
      alert(`Message: ${responseData.message || "Voted successfully"}`);
      setReload((prevReload) => prevReload + 1);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to vote");
    }
  };

  // Function to get rank color
  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"; // Gold
      case 1:
        return "bg-gradient-to-r from-gray-300 to-gray-400"; // Silver
      case 2:
        return "bg-gradient-to-r from-yellow-700 to-yellow-800"; // Bronze
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700"; // Others
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600">
      <div className="flex justify-center items-center py-8">
        <div className="w-full max-w-5xl mx-4">
          {sortedResponse.map((item, index) => (
            <div
              key={item.id}
              className="w-full rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-black p-2 transform transition duration-300 hover:scale-105 mb-3"
            >
              <div className="flex items-center">
                {/* New Rank Section */}
                <div className="flex-none w-16 flex items-center justify-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg transform -rotate-12 ${getRankColor(index)} shadow-lg`}>
                    <div className="transform rotate-12 text-white font-bold text-lg">
                      #{index + 1}
                    </div>
                  </div>
                </div>

                {/* Profile Picture Section */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    src="/images/DP.png"
                    alt={`${item.party} Profile Picture`}
                  />
                </div>

                {/* Party Name and Vote Count */}
                <div className="flex flex-col justify-center text-white ml-3">
                  <div className="text-sm font-semibold mb-1">{item.party}</div>
                  <p className="text-xs">
                    <span className="text-yellow-300">Votes:</span>{" "}
                    <span className="font-bold">{item.voteCount}</span>
                  </p>
                </div>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Vote Button */}
                <button
                  className="px-3 py-1 text-white bg-gray-700 hover:bg-gray-600 rounded-lg shadow-sm focus:outline-none transform transition duration-200 hover:scale-105"
                  onClick={() => {
                    handleVote(item.id);
                  }}
                >
                  Vote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboards;