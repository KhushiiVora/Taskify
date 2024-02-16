const app = require("./server");
const authRouter = require("./routers/auth.routers");
const dashboardRouter = require("./routers/dashboard.routers");

const passport = require("passport");
const configurePassport = require("./config/passport");
configurePassport(passport);

const authMiddleware = passport.authenticate("jwt", { session: false });

app.use("/auth", authRouter);

app.use(authMiddleware);
//it will return 401 unauthorized when token is not there
app.use("/dashboard", dashboardRouter);
