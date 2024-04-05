const app = require("./server");
const authRouter = require("./routers/auth.routers");
const userRouter = require("./routers/users.routers");
const dashboardRouter = require("./routers/dashboard.routers");
const messageRouter = require("./routers/message.routers");

const passport = require("passport");
const configurePassport = require("./config/passport");
configurePassport(passport);

const authMiddleware = passport.authenticate("jwt", { session: false });

app.use("/auth", authRouter);

app.get(
  "/user",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    res.send(req.user);
  }
);

app.use(authMiddleware);
//it will return 401 unauthorized when token is not there
app.use("/profile", userRouter);
app.use("/dashboard", dashboardRouter);
app.use("/chat", messageRouter);
