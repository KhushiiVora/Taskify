import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axiosConfig";
import "./App.css";

import { saved as userSaved } from "./state/userSlice";
import { restored as workspacesRestored } from "./state/workspaceSlice";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MainNavbar from "./components/navbar/MainNavbar";
import ChatBox from "./pages/ChatBox";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((response) => response.data)
      .then((user) => {
        console.log("user", user);
        dispatch(workspacesRestored(user.workspaces));
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
          <Route
            path="profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
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
        <Route path="/chatbox/:workspaceId" element={<ChatBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
