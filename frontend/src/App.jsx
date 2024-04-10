import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axiosConfig";
import "./App.css";

import { saved as userSaved } from "./state/userSlice";
import { restored as workspaceRestored } from "./state/workspaceSlice";

import Navbar from "./pages/components/Navbar";
import Home from "./pages/components/Home";
import Profile from "./pages/components/Profile";
import PublicProfile from "./pages/components/PublicProfile";
import SignUp from "./pages/components/SignUp";
import Login from "./pages/components/Login";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import Dashboard from "./pages/components/Dashboard";
import MainNavbar from "./pages/components/MainNavbar";
import ChatBox from "./pages/components/ChatBox";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((response) => response.data)
      .then((user) => {
        console.log("user", user);
        dispatch(workspaceRestored(user.workspaces));
        delete user.workspaces;
        delete user.password;
        dispatch(userSaved(user));
      })
      .catch((error) => console.log("Hello user"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navbar username={user.username} /> : <MainNavbar />}
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/profile/:username" element={<PublicProfile />} />
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
        <Route path="/chatbox/:workspaceId" element={<ChatBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
