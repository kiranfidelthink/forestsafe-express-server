const express = require("express");
const router = express.Router();
var authentication = require("../../../Service/service");
const UserController = require("../Controllers/UserController");
router.post("/create", authentication.validateToken, UserController.createUser);

router.get("/findAll", authentication.validateToken, UserController.getUsers);

router.get("/:id/find", authentication.validateToken, UserController.getUser);

router.delete(
  "/:id/delete",
  authentication.validateToken,
  UserController.deleteUser
);

router.patch(
  "/:id/update",
  authentication.validateToken,
  UserController.updateUser
);

module.exports = router;
