const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./src/Database/db");
const models = ["User", "Auth","Crew"];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

models.forEach((model) => {
  let routers = require("./src/api/" + model + "/Routes/routes.js");
  app.use("/" + model, routers);
});

app.use("*", function (req, res) {
  res.status(404).send("404");
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
