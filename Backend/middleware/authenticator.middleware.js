const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const authenticated = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.token);
      if (docoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.send({ msg: "Invalid token" });
      }
    }
  } catch (error) {
    res.send({ msg: "server error" });
    console.log(error);
  }
};
module.exports = {
    authenticated
}