const AuthService = require("../Services/AuthService");
const bcrypt = require("bcrypt");
require("dotenv").config;
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  await AuthService.login(req.body)
    .then(async (response) => {
      console.log("Res", response);
      if (response !== null) {
        await bcrypt
          .compare(req.body.password, response.password)
          .then((match) => {
            if (match) {
              let result = {};
              const payload = {
                username: response.username,
                role: response.role,
              };
              const options = {
                expiresIn: "2d",
                issuer: "https://crew.forestsafe.co.nz",
              };
              const secret = process.env.JWT_SECRET;
              const token = jwt.sign(payload, secret, options);
              result.token = token;
              result.user = response;
              res.send(result);
            } else {
              res.status(403).send({
                message: "User enters an invalid password",
              });
            }
          });
      } else {
        res.status(400).send({
          message: `Can not find User with given username ${req.body.username}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.signup = async (req, res) => {
  return await AuthService.login(req.body)
    .then((response) => {
      console.log("Res1", response);
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// exports.sendOtp = async (req, res) => {
//   return await AuthService.sendOtp(req.body)
//     .then((response) => {
//       console.log("Res", response);
//       res.send({
//         message: "Otp has been successfully send to your device.",
//       });
//     })
//     .catch((err) => {
//       res.status(400).send({
//         message: err.message || "Some error occurred while retrieving data.",
//       });
//     });
// };

// exports.verifyPhone = async function (req, res) {
//   const verifyOtp = req.body.otp;
//   return await AuthService.verifyOtp(req.body)
//     .then((response) => {
//       console.log("Res", response);
//       if (response !== null) {
//         if (verifyOtp == response.temprory_otp) {
//           res.send({ message: "Phone successfully verified." });
//         } else {
//           res.status(400).send({ message: "User enters an incorrect otp." });
//         }
//       } else {
//         res.status(400).send({
//           message: "Phone number not registered for otp.",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(400).send({
//         message: err.message || "Some error occurred while retrieving data.",
//       });
//     });
// };

// exports.sendMail = async (req, res) => {
//   return await AuthService.sendMail(req.body)
//     .then((response) => {
//       console.log("Res", response);
//       res.send(response);
//     })
//     .catch((err) => {
//       res.status(400).send({
//         message: err.message || "Some error occurred while retrieving data.",
//       });
//     });
// };

// exports.verifyEmail = async (req, res) => {
//   return await AuthService.verifyEmail(req.body)
//     .then((response) => {
//       console.log("Res", response);
//       res.send({ Message: "Email Verified successfully." });
//     })
//     .catch((err) => {
//       res.status(400).send({
//         message: err.message || "Some error occurred while retrieving data.",
//       });
//     });
// };

// exports.changePassword = async (req, res) => {
//   return await AuthService.changePassword(req.body)
//     .then((response) => {
//       console.log("Res", response);
//       res.send(response);
//     })
//     .catch((err) => {
//       res.status(400).send({
//         message: err.message || "Some error occurred while retrieving data.",
//       });
//     });
// };
