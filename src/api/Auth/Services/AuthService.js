const User = require("../../User/Entities/User");

exports.login = async (data) => {
  const { username } = data;
  return await User.findOne({ username });
};

exports.sendOtp = async (data) => {
  const secretLoginCode = Date.now().toString().slice(-4);
  let response;
  const params = {
    Message: secretLoginCode /* required */,
    PhoneNumber: data.mobile_number,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  };
  await new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise()
    .then((res) => {
      return model.User.update(
        { temprory_otp: secretLoginCode },
        {
          returning: true,
          plain: true,
          where: { mobile_number: data.mobile_number },
        }
      );
    })
    .then((user) => {
      response = user;
    })
    .catch((err) => {
      response = err;
    });
  return response;
};

exports.verifyOtp = async (data) => {
  return await model.User.findOne({
    where: {
      mobile_number: data.mobile_number,
    },
    attributes: ["temprory_otp", "mobile_number"],
  });
};

exports.sendMail = async (event) => {
  console.log("Event ", event);
  if (event.triggerSource === "CustomMessage_SignUp") {
    const { codeParameter } = event.request;
    const { userName, region } = event;
    const { clientId } = event.callerContext;
    const { email } = event.request.userAttributes;
    const url = "https://dev.dashboard.consoleshark.com/mobile-verification";
    const link = `<a href="${url}?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}" target="_blank">here</a>`;
    event.response.emailSubject = "Your verification link";
    event.response.emailMessage = `Thank you for signing up. Click ${link} to verify your email.`;
  }
  return event;
};

exports.verifyEmail = async (data) => {
  const params = {
    ClientId: data.clientId,
    ConfirmationCode: data.code,
    Username: data.username,
  };
  return await cognitoServiceProvider.confirmSignUp(params).promise();
};

exports.changePassword = async (data) => {
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: data.username,
    Password: data.password,
  });
  var userData = {
    Username: data.username,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        cognitoUser.changePassword(
          data.password,
          data.newpassword,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve({ Message: "Password successfully changed." });
            }
          }
        );
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
};
