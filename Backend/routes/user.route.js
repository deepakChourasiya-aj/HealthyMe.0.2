const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("jsonwebtoken");
const { login, register } = require("../controller/user.controller");
const cookieParser = require("cookie-parser");
const { authenticated } = require("../middleware/authenticator.middleware");
const {
  addToCart,
  removeProduct,
  availablePruductInCart,
} = require("../controller/cart.controller");

// Register route

userRouter.post("/register", register);

// Login routea

userRouter.post("/login", login);

//add to cart--------------------------------------------------------------

userRouter.post("/cart/:id", authenticated, addToCart);

//removeProduct -----------------------------------------------------------

userRouter.delete("/cart/:id", authenticated, removeProduct);

// availablePruductInCart -------------------------------------------------

userRouter.get("/cart/", authenticated, availablePruductInCart);


module.exports = {
  userRouter,
};
