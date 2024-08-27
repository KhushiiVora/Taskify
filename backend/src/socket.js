require("dotenv").config();
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const baseURL = process.env.BASE_URL;

const io = new Server(server, {
  cors: {
    origin: baseURL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUsers = {};
let room;

io.on("connection", (socket) => {
  // console.log("socket id: ", socket.id);
  const userID = socket.handshake.query.userId;

  socket.on("join-workspace-room", (workspaceId) => {
    room = workspaceId;
    socket.join(room);
    // console.log("room joined with id ", room);

    onlineUsers[userID] = socket.id;

    const users = Object.keys(onlineUsers);
    io.to(room).emit("online-users", users);
  });

  socket.on("disconnect", () => {
    // console.log("--user disconnected--");
    delete onlineUsers[userID];
    const users = Object.keys(onlineUsers);
    io.to(room).emit("online-users", users);
  });
});

module.exports = { app, server, io };
