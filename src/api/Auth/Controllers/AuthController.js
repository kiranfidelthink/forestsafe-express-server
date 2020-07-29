const AuthService = require("../Services/AuthService");
const UserService = require("../../User/Services/UserService");
const authentication = require("../../../Resource/utils");
const bcrypt = require("bcrypt");
require("dotenv").config;

exports.login = async (req, res) => {
  await UserService.getUser(req.body)
    .then(async (response) => {
      console.log("Res", response);
      let result = {};
      if (response !== null) {
        await bcrypt
          .compare(req.body.password, response.password)
          .then((match) => {
            if (match) {
              const payload = {
                username: response.username,
                role: response.role,
              };
              result.token = authentication.generateToken(payload);
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

exports.getToken = async (req, res) => {
  console.log("get users", req.params.id);
  if (!req.decoded.role || req.decoded.role !== "ADMIN") {
    res.status(400).send({
      message: `User do not have access permissions.`,
    });
    return;
  }
  await UserService.get(req.params.id)
    .then((response) => {
      console.log("Res", response);
      let result = {};
      if (response !== null) {
        const payload = {
          username: response.username,
          role: response.role,
        };
        result.token = authentication.generateToken(payload);
        result.user = response;
        res.send(result);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`,
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

exports.sendMail = async (req, res) => {
  return await AuthService.resetPasswordMail(req.body)
    .then((response) => {
      console.log("Res", response);
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
