import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Leaderboards() {
  const navigate = useNavigate();

  const [Parties, setParties] = useState([]);

  const [Reload, setReload] = useState(0);

  const sortedResponse = [...Parties].sort((a, b) => b.voteCount - a.voteCount);

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
        console.log(responseData.response);
        setParties(responseData.response);
      } catch (error) {
        console.log("parties data return nhi hua");
      }
    };
    voteData();
  }, [Reload]);

  const handleVote = async (candidateID) => {
    try {
      const token = localStorage.getItem("authToken");

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
        alert(`Error: ${errorData.error || "Something went wrong"}`);
        return;
      }

      const responseData = await response.json();
      console.log(responseData.message);
      alert(`Message: ${responseData.message || "voted successfully"}`);
      setReload((prevReload) => prevReload + 1);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to vote");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600">


      {/* Voting App Content */}
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col space-y-8 max-w-xl mx-auto">
          {/* Render cards dynamically */}
          {sortedResponse.map((item) => (
            <div
              key={item.id}
              className="max-w-sm rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r from-gray-700 via-gray-800 to-black p-6 transform transition duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-6">
                {/* Profile Picture Section */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    className="w-full h-full object-cover"
                    src="/images/DP.png"
                    alt={`${item.party} Profile Picture`}
                  />
                </div>

                {/* Party Name and Vote Count */}
                <div className="flex flex-col justify-center text-white">
                  <div className="text-2xl font-bold mb-2">Bhartiya Janta Party</div>
                  <p className="text-lg font-medium">
                    <span className="text-yellow-300">Votes:</span>{" "}
                    <span className="font-semibold">{item.voteCount}</span>
                  </p>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex justify-end p-4">
                <button
                  className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md focus:outline-none transform transition duration-200 hover:scale-105"
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
