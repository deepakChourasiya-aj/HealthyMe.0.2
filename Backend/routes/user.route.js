const express = require("express")
const userRouter = express.Router();
const jwt =require("jsonwebtoken");
const bcrypt = require("jsonwebtoken");
const { login, register } = require("../controller/user.controller");
const cookieParser = require("cookie-parser");
// Register route
userRouter.post("/register",register);
  
  // Login route
userRouter.post("/login",login);





module.exports = {
    userRouter
}