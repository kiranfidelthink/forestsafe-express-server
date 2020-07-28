const express = require("express");
const router = express.Router();
var authentication = require("../../../Resource/utils");
const UserController = require("../Controllers/UserController");
router.post("/create", UserController.createUser);

router.get(
  "/:id/findAll",
  // authentication.validateToken,
  UserController.getUsers
);

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
