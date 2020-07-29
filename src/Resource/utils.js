require("dotenv").config;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
  generateToken: (payload) => {
    const options = {
      expiresIn: "2d",
      issuer: "https://crew.forestsafe.co.nz",
    };
    const secret = process.env.JWT_SECRET;
    return (token = jwt.sign(payload, secret, options));
  },
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: "2d",
        issuer: "https://crew.forestsafe.co.nz",
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
      };
      res.status(401).send(result);
    }
  },

  sendMail: async (data, mailOptions) => {
    var smtpTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "forestsafetest@gmail.com",
        pass: "forestsafe",
      },
    });
    return smtpTransport
      .sendMail(mailOptions)

      .then((res) => {
        console.log("res", res);
        return res;
      })
      .catch((err) => {
        console.log("Error", err);
        throw err;
      });
  },
};
