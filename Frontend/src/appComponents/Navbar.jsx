import React from 'react';
import { useNavigate, useLocation } from 'react-router';

function Navbar({admin}) {
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = localStorage.getItem('authToken');

  const isActive = (path) => location.pathname === path ? 'bg-gray-600' : 'hover:bg-gray-500';

  const handleAdminClick = () => {
    console.log(admin);
    if (admin) {
      navigate('/admin');
    } else {
      navigate('/');
      alert('You need admin privileges to access this page');
    }
  };

  return (
    <nav className="bg-gray-900 shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Voting App Title (left) */}
          <div className="flex-1">
            <span className="text-xl font-bold text-white tracking-wider">
              Voting App
            </span>
          </div>

          {/* Navigation Buttons on the Right */}
          <div className="flex space-x-4">
            {/* Home Button */}
            <button
              className={`text-white px-4 py-2 rounded-lg text-md font-semibold transition duration-300 transform ${isActive('/')}`}
              onClick={() => navigate('/')}
            >
              Home
            </button>

            {/* Leaderboards Button */}
            <button
              className={`text-white px-4 py-2 rounded-lg text-md font-semibold transition duration-300 transform ${isActive('/leaderboards')}`}
              onClick={() => navigate('/leaderboards')}
            >
              Leaderboards
            </button>

            {authToken ? (
              <button
                className={`text-white px-4 py-2 rounded-lg text-md font-semibold transition duration-300 transform ${isActive('/login')}`}
                onClick={() => {
                  localStorage.removeItem('authToken');
                  navigate('/login');
                  window.location.reload()
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className={`text-white px-4 py-2 rounded-lg text-md font-semibold transition duration-300 transform ${isActive('/login')}`}
                onClick={() => {
                  navigate('/login')
                }}
                
              >
                Login
              </button>
            )}

            {/* Profile Button */}
            <button
              className={`text-white px-4 py-2 rounded-lg text-md font-semibold transition duration-300 transform ${isActive('/profile')}`}
              onClick={() => {
                navigate('/profile')
              }}
            >
              Profile
            </button>

            {/* Admin Button - Always visible */}
            <button
              className={`text-white px-4 py-2 rounded-lg text-md font-semibold transition duration-300 transform ${isActive('/admin')}`}
              onClick={handleAdminClick}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;