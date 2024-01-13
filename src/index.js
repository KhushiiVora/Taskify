/* IF NEEDED THEN SEPARATE app.js AND index.js WHERE
  app.js will only have server related code
  index.js will have all other code. */
const express = require("express");
const cors = require("cors");
const app = express();
require("./db/mongoose");
const port = process.env.PORT;

const authRouter = require("./routers/auth.routers");

app.use(
  cors({
    origin: `http://localhost:5173`,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log("Server is on at port", port, "!!!");
});
