import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [UserInfo, setUserInfo] = useState({

  });
  
  useEffect(() => {
     const fetchData= async()=>{
       try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('No authentication token found');
          return;
        }

        const response = await fetch('http://localhost:4000/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });     
        if(!response.ok){
          const errorData = await response.json();
          alert(`Error: ${errorData.error || "Something went wrong"}`);
          return;
        }

        const responseData= await response.json();
        console.log(responseData);
        setUserInfo(responseData.data);

       } catch (error) {
      console.error("Error:", error);
      alert("Failed to load profile");        
       }
     }
     fetchData();
  }, [])
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600">

      <div className="flex justify-center items-center py-12">
        <div className="max-w-2xl w-full mx-4">
          <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-black rounded-lg shadow-2xl p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
                <img
                  className="w-full h-full object-cover"
                  src="/images/DP.png"
                  alt="Profile"
                />
              </div>
              <span className="px-4 py-1 bg-gray-600 text-white rounded-full text-sm font-semibold mb-2">
                {UserInfo.role}
              </span>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Full Name</p>
                      <p className="text-white font-medium">{UserInfo.name}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Age</p>
                      <p className="text-white font-medium">{UserInfo.age} years</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <p className="text-white font-medium">{UserInfo.email}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Aadhar Number</p>
                      <p className="text-white font-medium">{UserInfo.aadharCardNumber}</p>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Address</p>
                    <p className="text-white font-medium">{UserInfo.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <button className="w-full bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                    Edit Profile
                  </button>
                  <button className="w-full bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;