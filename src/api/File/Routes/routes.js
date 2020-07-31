const express = require("express");
const router = express.Router();
const authentication = require("../../../Resource/utils");
const FileController = require("../Controllers/FileController");
const { upload } = require("../../../Database/db");

router.post("/create", upload.single("image"), FileController.createFile);

router.get("/:id/find", FileController.getFile);

router.delete("/:id/delete", FileController.deleteFile);

router.patch(
  "/:doc_id/:id/update",
  authentication.validateToken,
  FileController.updateFile
);

module.exports = router;
