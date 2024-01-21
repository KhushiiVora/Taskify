import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Home from "./pages/components/Home";
import Profile from "./pages/components/Profile";
import SignUp from "./pages/components/SignUp";
import Login from "./pages/components/Login";
import Workspace from "./pages/components/Workspace";
import Dashboard from "./pages/components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* <Route path="workspace" element={<Workspace />} /> */}
        <Route path="dashboard/:username" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
