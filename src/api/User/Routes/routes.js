const express = require("express");
const router = express.Router();
var authentication = require("../../../Resource/utils");
const UserController = require("../Controllers/UserController");
router.post("/create", UserController.createUser);

router.get(
  "/:id/findAll",
  authentication.validateToken,
  UserController.getUsers
);

router.get("/:id/find", authentication.validateToken, UserController.getUser);

router.get(
  "/find",
  authentication.validateToken,
  UserController.getUserWithToken
);

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

router.patch(
  "/:id/update_password",
  authentication.validateToken,
  UserController.updatePassword
);
module.exports = router;
