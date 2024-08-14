const express = require("express");
const { app, server } = require("./socket");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const app = express();
require("./db/mongoose");
const port = process.env.PORT;
const baseURL = process.env.BASE_URL;

app.use(
  cors({
    origin: baseURL,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

server.listen(port, () => {
  console.log("Server is on at port", port, "!!!");
});

module.exports = app;
