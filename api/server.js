const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

const authRouter = require("./auth/authRouter.js");
const userRouter = require("./student/userRouter.js");

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the NASA API</h1>
    <p> Refer to repo README for endpoints and data structure </p>
  `);
});

module.exports = server;