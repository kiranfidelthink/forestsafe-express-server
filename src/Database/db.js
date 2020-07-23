var mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("useCreateIndex", true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

//Connection establishment
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

//We enebled the Listener
db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log("DB Connection established succesfully");
});
