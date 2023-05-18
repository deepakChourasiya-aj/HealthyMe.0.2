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
  updateQuantity,
} = require("../controller/cart.controller");
// Register route
const nodemailer = require("nodemailer");
const { User } = require("../models/user.model");
userRouter.post("/register", register);

// const sendMailToUser = () => {
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "deepak1812002@gmail.com",
  //     pass: "lyrcaidunrqzunpm",
  //   },
  // });

  // const mailOptions = {
  //   from: "deepak1812002@gmail.com",
  //   to: email,
  //   subject: "Here is your OTP for Medistar Login",
  //   html: `  <!DOCTYPE html>
  //       <html>
  //         <head>
  //           <title>Example Email Template</title>
  //           <meta charset="utf-8" />
  //           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //         </head>
  //         <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5; color: #333; padding: 20px;">
  //           <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse;">
  //             <tr>
  //               <td style="background-color: #0077c0; text-align: center; padding: 10px;">
  //                 <h1 style="font-size: 28px; color: #fff; margin: 0;">MEDISTAR HOSPITALS</h1>
  //               </td>
  //             </tr>
  //             <tr>
  //               <td style="padding: 20px;">
  //                 <h2 style="font-size: 24px; color: #0077c0; margin-top: 0;">Your OTP for Medistar Login : ${12311}</h2>
  //                 <p style="margin-bottom: 20px;">Thank you for choosing Medistar Services</p>
  //                 <p style="margin-bottom: 0;">Best regards,</p>
  //                 <p style="margin-bottom: 20px;">Medistar Hospitals</p>
  //               </td>
  //             </tr>
  //           </table>
  //         </body>
  //       </html>`,
  // };

  // transporter
  //   .sendMail(mailOptions)
  //   .then((info) => {
  //     console.log(info.response);
  //     // return res.send({ msg: "Mail has been Send", email });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     // return res.send(e);
  //   });
// };

// Login routea

userRouter.post("/emailVerify", async (req, res) => {
  let {name, email, password } = req.body;
  const isPresent = await User.findOne({ email });
  if (isPresent) {
    return res.status(500).send({
      msg: "You are already registered. Please login!",
    });
  }  
;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "deepak1812002@gmail.com",
      pass: "lyrcaidunrqzunpm",
    },
  });

  const mailOptions = {
    from: "deepak1812002@gmail.com",
    to: email,
    subject: "Here is your OTP for Medistar Login",
    html: `  <!DOCTYPE html>
        <html>
          <head>
            <title>Example Email Template</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5; color: #333; padding: 20px;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse;">
              <tr>
                <td style="background-color: #0077c0; text-align: center; padding: 10px;">
                  <h1 style="font-size: 28px; color: #fff; margin: 0;">MEDISTAR HOSPITALS</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <h2 style="font-size: 24px; color: #0077c0; margin-top: 0;">Your OTP for Medistar Login : ${1122}</h2>
                  <p style="margin-bottom: 20px;">Thank you for choosing Medistar Services</p>
                  <p style="margin-bottom: 0;">Best regards,</p>
                  <p style="margin-bottom: 20px;">Medistar Hospitals</p>
                </td>
              </tr>
            </table>
          </body>
        </html>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log(info.response);
      res.send({ msg: "Mail has been Send", email });
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});


userRouter.post("/login", login);

//add to cart--------------------------------------------------------------

userRouter.post("/cart/:id", authenticated, addToCart);

//removeProduct -----------------------------------------------------------

userRouter.delete("/cart/:id", authenticated, removeProduct);

//
userRouter.patch("/cart/:id", authenticated, updateQuantity);

// availablePruductInCart -------------------------------------------------

userRouter.get("/cart/", authenticated, availablePruductInCart);

module.exports = {
  userRouter,
};
