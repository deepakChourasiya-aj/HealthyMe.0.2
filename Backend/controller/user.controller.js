const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const nodemailer = require("nodemailer");





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
    // email service here;

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
    //     <html>
    //       <head>
    //         <title>Example Email Template</title>
    //         <meta charset="utf-8" />
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //       </head>
    //       <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5; color: #333; padding: 20px;">
    //         <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse;">
    //           <tr>
    //             <td style="background-color: #0077c0; text-align: center; padding: 10px;">
    //               <h1 style="font-size: 28px; color: #fff; margin: 0;">MEDISTAR HOSPITALS</h1>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td style="padding: 20px;">
    //               <h2 style="font-size: 24px; color: #0077c0; margin-top: 0;">Your OTP for Medistar Login : ${12311}</h2>
    //               <p style="margin-bottom: 20px;">Thank you for choosing Medistar Services</p>
    //               <p style="margin-bottom: 0;">Best regards,</p>
    //               <p style="margin-bottom: 20px;">Medistar Hospitals</p>
    //             </td>
    //           </tr>
    //         </table>
    //       </body>
    //     </html>`,
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

    // --------------------------------------------

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
          msg: "Login successful",
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
