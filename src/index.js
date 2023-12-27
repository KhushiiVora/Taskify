const express = require("express");
const http = require("http");
require("./db/mongoose");

const port = process.env.PORT;

const app = express();
const server = http.createServer(app);

app.use(express.json());
server.listen(port, () => {
  console.log("Server is on at port ", port, "!!!");
});
