const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
app.use(cors());

require("dotenv").config();
const registerRouter = require("./Routes/register");
const loginRouter = require("./Routes/login");
const serverRouter = require("./Routes/server");
const channelRouter = require("./Routes/channel");
const userRouter = require("./Routes/users");
app.use(express.json());
app.use("/uploads/servers", express.static("./Uploads/servers"));
app.use("/uploads/users", express.static("./Uploads/users"));
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/server", serverRouter);
app.use("/user", userRouter);
// app.use(function (req, res, next) {
//   //? adding io to req so i can use it in other files
//   req.io = io;
//   next();
// });

app.use("/channel", channelRouter);

require("./Socket")(io);

// app.get("/:id", function (req, res) {

// });
http.listen(process.env.PORT);
