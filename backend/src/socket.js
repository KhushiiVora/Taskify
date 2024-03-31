const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join-workspace-room", (workspaceId) => {
    socket.join(workspaceId);
    console.log("room joined with id ", workspaceId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    // delete userSocketMap[userId];
    // io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io };
