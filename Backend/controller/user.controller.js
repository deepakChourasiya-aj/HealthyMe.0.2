const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Input validation - check that name, email, and password are present in the request body
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Name, email, and password are required." });
    }
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 5);
    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();

    return res
      .status(201)
      .json({ msg: "Signup successfully", user: savedUser });
  } catch (error) {
    console.error("Error in registering", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation -/check that email and password are present in  body
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required." });
    }

    // Check the user in the database
    const findUser = await User.findOne({ email });

    if (findUser) {
      const passwordMatches = await bcrypt.compare(password, findUser.password);

      if (passwordMatches) {
        // Generate a JWT token
        const token = jwt.sign(
          { userID: findUser._id },
          process.env.JWT_SECRET
        );
        const refreshToken = jwt.sign(
          { userID: findUser._id },
          process.env.JWT_SECRET
        );

        // Set the token in a cookie
        const cookieOptions = {
          httpOnly: true,
          maxAge: process.env.COOKIE_MAX_AGE,
        };
        const cookieOptionsForRefreshToken = {
          httpOnly: true,
          maxAge: process.env.COOKIE_MAX_AGE_REFRESH_TOKEN,
        };
        res
          .cookie("token", token, cookieOptions)
          .cookie("refreshToken", refreshToken, cookieOptionsForRefreshToken);
        return res.status(200).json({
          msg: "Login successful...",
          name: findUser.name,
          token,
          refreshToken,
        });
      }
    }
    // Send a failed login response if the user could not be authenticated
    return res.status(401).json({ msg: "Invalid email or password." });
  } catch (error) {
    // Log any errors and send a server error response
    console.error("Error in logging in", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { register, login };
