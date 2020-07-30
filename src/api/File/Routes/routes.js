const express = require("express");
const router = express.Router();
const authentication = require("../../../Resource/utils");
const FileController = require("../Controllers/FileController");
router.post("/:doc_id/create", authentication.validateToken,FileController.createFile);

router.get("/:doc_id/findAll", authentication.validateToken, FileController.getFiles);

router.delete(
  "/:doc_id/:id/delete",
  authentication.validateToken,
  FileController.deleteFile
);

router.patch(
  "/:doc_id/:id/update",
  authentication.validateToken,
  FileController.updateFile
);

module.exports = router;
