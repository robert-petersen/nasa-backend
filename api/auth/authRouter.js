const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const { jwtSecret } = require('../../config/secrets.js');
const Users = require("../user/usermodel.js");

router.post("/register-user", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 8);
    credentials.password = hash;
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: "Error adding new student!", errMessage: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide an unique username and a password!",
    });
  }
});

router.post("/login", (req, res) => {
  const loginUser = {
    username: req.body.username,
    password: req.body.password
  }
  if (isValidLogin(loginUser)) {
    Users.findBy({ username: loginUser.username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(loginUser.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome ${user.username}`, token: token, user: {userId: user.userId, username: user.username} });
        } else {
          res.status(401).json({ message: "Invalid Credentials!" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: `Error logging finding user: ${loginUser.username}!`, errMessage: error.message, recived: loginUser });
      });
  }
});

function generateToken(user) {
  const payload = {
    username: user.username,
    password: user.password,
  }
  const options = {
    expiresIn: "1d",
  }
  return jwt.sign(payload, jwtSecret, options)
}

function isValid(user) {
  return Boolean(
    user.username && 
    typeof user.username === "string" && 
    user.password && 
    typeof user.password === "string"
  );
}

function isValidLogin(user) {
  return Boolean(
    user.username && 
    typeof user.username === "string" && 
    user.password && 
    typeof user.password === "string"
  );
}

module.exports = router;