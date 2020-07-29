const User = require("../../User/Entities/User");
const authentication = require("../../../Resource/utils");

exports.resetPasswordMail = async (data) => {
  let response, result;
  const { email } = data;
  await User.findOne({ emailAddress: email })
    .then(async (user) => {
      if (!user) {
        console.log("User not found");
      } else {
        if (email === user.emailAddress) {
          const payload = {
            username: user.username,
            role: user.role,
          };
          token = authentication.generateToken(payload);
          var mailOptions = {
            to: email,
            from: "forestsafetest@gmail.com",
            subject: "Reset Password Notification",
            html:
              '<div style="font-size: 16px;">' +
              '<h4 style="color: #3d4852;"><b>Hello</b></h4> <br />' +
              "<p>You are receiving this email because we received a password reset request for your account.</p>" +
              `<a href='https://crew.forestsafe.co.nz/password/reset/${token}?email=${email}'>https://crew.forestsafe.co.nz/password/reset/${result.token}?email=${email}</a>` +
              "<p>This password reset link will expire in 60 minutes.</p>" +
              "<p>If you did not request a password reset, no further action is required.</p>" +
              "<p>Regards,<br />Forest Safe</p>" +
              "</div>",
          };
          response = authentication.sendMail(data, mailOptions);
        }
      }
    })
    .catch((err) => {
      console.log("Error", err);
      throw err;
    });
  return response;
};

// exports.sendOtp = async (data) => {
//   const secretLoginCode = Date.now().toString().slice(-4);
//   let response;
//   const params = {
//     Message: secretLoginCode /* required */,
//     PhoneNumber: data.mobile_number,
//     MessageAttributes: {
//       'AWS.SNS.SMS.SMSType': {
//         DataType: 'String',
//         StringValue: 'Transactional',
//       },
//     },
//   };
//   await new AWS.SNS({ apiVersion: '2010-03-31' })
//     .publish(params)
//     .promise()
//     .then((res) => {
//       return model.User.update(
//         { temprory_otp: secretLoginCode },
//         {
//           returning: true,
//           plain: true,
//           where: { mobile_number: data.mobile_number },
//         }
//       );
//     })
//     .then((user) => {
//       response = user;
//     })
//     .catch((err) => {
//       response = err;
//     });
//   return response;
// };

// exports.verifyOtp = async (data) => {
//   return await model.User.findOne({
//     where: {
//       mobile_number: data.mobile_number,
//     },
//     attributes: ['temprory_otp', 'mobile_number'],
//   });
// };

// exports.verifyEmail = async (data) => {
//   const params = {
//     ClientId: data.clientId,
//     ConfirmationCode: data.code,
//     Username: data.username,
//   };
//   return await cognitoServiceProvider.confirmSignUp(params).promise();
// };

// exports.changePassword = async (data) => {
//   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//     Username: data.username,
//     Password: data.password,
//   });
//   var userData = {
//     Username: data.username,
//     Pool: userPool,
//   };
//   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//   return new Promise((resolve, reject) => {
//     cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: function (result) {
//         cognitoUser.changePassword(
//           data.password,
//           data.newpassword,
//           (err, result) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve({ Message: 'Password successfully changed.' });
//             }
//           }
//         );
//       },
//       onFailure: function (err) {
//         reject(err);
//       },
//     });
//   });
// };
