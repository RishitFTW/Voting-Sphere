import { useEffect, useState } from "react";
import "./App.css";
import Signup from "./appComponents/Signup";
import Login from "./appComponents/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import Profile from "./appComponents/Profile";
import Navbar from "./appComponents/Navbar";
import Leaderboards from "./appComponents/Leaderboards";
import Adminpanel from "./appComponents/Adminpanel";
import Home from "./appComponents/Home";

function App() {
  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setAdmin(false);
          return; 
        }
        const tokenResponse = await fetch(
          "http://localhost:4000/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const tokenData = await tokenResponse.json();
        if (tokenData.data.role === "admin") {
          setAdmin(true);
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
      }
    };
    checkAdmin();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Leaderboards" element={<Leaderboards />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Admin" element={<Adminpanel admin={Admin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
