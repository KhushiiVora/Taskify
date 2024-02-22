import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axiosConfig";

import { saved as userSaved } from "./state/userSlice";

import Navbar from "./pages/components/Navbar";
import Home from "./pages/components/Home";
import Profile from "./pages/components/Profile";
import SignUp from "./pages/components/SignUp";
import Login from "./pages/components/Login";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import Workspace from "./pages/components/Workspace";
import Dashboard from "./pages/components/Dashboard";
// import Certificate from "./this";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((response) => response.data)
      .then((user) => {
        dispatch(userSaved(user));
      })
      .catch((error) => console.log("Hello user"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/dashboard">
          <Route
            path=":username"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
