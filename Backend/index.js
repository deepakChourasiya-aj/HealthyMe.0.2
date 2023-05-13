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

app.use(cookieParser());
app.use(express.json());

app.get("/", authenticated, (req, res) => {
  console.log(req.body.userID);
  res.send("hello world!");
});
// User routes;
app.use("/api", userRouter);

// product route routes;
app.use("/api", productRoute);

// --------------------------------------------------------------------
// app.post("/api/cart/:id", authenticated, async (req, res) => {
//   const { userID } = req.body;
//   const isUserPresent = await User.findOne({ _id: userID });
//   //  product.purchase.push(req.params.id);
//   console.log(isUserPresent, "isUserPresent");
//   const valid = await Product.findOne({ _id: req.params.id });
//   console.log(valid, "valid product");
//   if (valid) {
//     isUserPresent.purchase.push(req.params.id);
//     await isUserPresent.save();
//     res.status(201).json({ msg: "Product added successfully", isUserPresent });
//   } else {
//     res.status(404).json({ msg: "Invalid id" });
//   }
// });

// //delete ------------------------------------------------------------

// app.delete("/api/cart/:id", authenticated, async (req, res) => {
//   const { userID } = req.body;
//   const { productID } = req.params;
//   const isUserPresent = await User.findOne({ _id: userID });
//   //  product.purchase.push(req.params.id);
//   console.log(isUserPresent, "isUserPresent");

//   const result = await User.updateOne(
//     { _id: userID },
//     { $pull: { purchase: {$in:[req.params.id]} } }
//   );
//     // await result.save();
//     console.log(result,'result data.........');
//     res.send({msg:"delete successfully", result});

// });

// // ----------------------------------------------------------------------

// app.get("/api/checkout/", authenticated, async (req, res) => {
//   let userID = req.body.userID;
//   console.log(userID, "userid..");
//   let data = await User.findOne({ _id: userID }).populate("purchase");
//   res.send({ msg: "Available product in cart", data });
// });

// Start the server and establish a database connection
app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error while connecting to database:", error);
  }
});
