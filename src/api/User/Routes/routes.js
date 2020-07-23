const express = require("express");
const router = express.Router();
var authentication = require("../../../Service/service");
const UserController = require("../Controllers/UserController");
router.post("/create", UserController.createUser);

router.get("/findAll", UserController.getUsers);

router.get("/:id/find", UserController.getUser);

router.delete("/:id/delete", UserController.deleteUser);

router.patch("/:id/update", UserController.updateUser);

module.exports = router;
