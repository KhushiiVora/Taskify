/* IF NEEDED THEN SEPARATE app.js AND index.js WHERE
  app.js will only have server related code
  index.js will have all other code. */
const express = require("express");
const cors = require("cors");
const app = express();
require("./db/mongoose");
const port = process.env.PORT;

const userRouter = require("./routers/users.routers");

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server is on at port", port, "!!!");
});
