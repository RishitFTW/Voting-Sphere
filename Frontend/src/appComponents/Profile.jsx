import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Profile = () => {
  const navigate=useNavigate();
  const [UserInfo, setUserInfo] = useState({
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  useEffect(() => {
     const fetchData= async()=>{
       try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/signup');
          return;
        }

        const response = await fetch('https://voting-app-backend-a9eb.onrender.com/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });     
        if(!response.ok){
          const errorData = await response.json();
          alert(`Error: ${errorData.message || "Something went wrong"}`);
          return;
        }

        const responseData= await response.json();
        setUserInfo(responseData.data);

       } catch (error) {
      console.error("Error:", error);
      alert("Failed to load profile");        
       }
     }
     fetchData();
  }, [])
  

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert('Both old and new passwords are required.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://voting-app-backend-a9eb.onrender.com/user/profile/password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword: oldPassword, newPassword }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        alert(`Error: ${errorData.message || "Something went wrong"}`);
      } else {
        alert(responseData.message || 'Password updated successfully');
        setOldPassword('');
        setNewPassword('');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update password');
    }
  };




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
          {/* Personal Information Section */}
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


          {/* Update Password Section */}
          <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Update Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2" htmlFor="old-password">
                      Old Password
                    </label>
                    <input
                      type="password"
                      id="old-password"
                      placeholder="Enter your old password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2" htmlFor="new-password">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                  <button
                    onClick={handleUpdatePassword}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                  >
                    Update Password
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