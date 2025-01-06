import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router";
import Profile from "./appComponents/Profile";
import Navbar from "./appComponents/Navbar";
import Leaderboards from "./appComponents/Leaderboards";
import Adminpanel from "./appComponents/Adminpanel";
import Home from "./appComponents/Home";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";



function App() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setAdmin(false);
          return;
        }
        const tokenResponse = await fetch(
          "https://voting-app-backend-a9eb.onrender.com/user/profile",
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
          console.log(admin);
        } else {
          setAdmin(false);
          console.log(admin);
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        setAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  return (
    <BrowserRouter>
      <Navbar admin={admin} setAdmin={setAdmin} />
      <Routes>
        <Route path="/Leaderboards" element={<Leaderboards />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm setAdmin={setAdmin} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Adminpanel /> }/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;