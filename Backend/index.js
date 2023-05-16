const express = require("express");
const app = express();

require("dotenv").config();
const { User } = require("./models/user.model");
const { connection } = require("./config/db");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/user.route");
const { Product } = require("./models/product.model");
const { productRoute } = require("./routes/product.route");
const { authenticated } = require("./middleware/authenticator.middleware");
const { admintRoute } = require("./routes/admin.route");
const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("hello world!");
});
// User routes;
app.use("/api", userRouter);

// product route routes;
app.use("/api", productRoute);

//admin route;
app.use("/api", admintRoute);
// Start the server and establish a database connection
app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error while connecting to database:", error);
  }
});
