const express = require("express");
const router = express.Router();
var authentication = require("../../../Resource/utils");
const CrewController = require("../Controllers/CrewController");
router.post("/create", authentication.validateToken, CrewController.createCrew);

router.get("/findAll", authentication.validateToken, CrewController.getCrews);

router.get("/:id/find", authentication.validateToken, CrewController.getCrew);

router.delete(
  "/:id/delete",
  authentication.validateToken,
  CrewController.deleteCrew
);

router.patch(
  "/:id/update",
  authentication.validateToken,
  CrewController.updateCrew
);

module.exports = router;
