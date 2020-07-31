const express = require("express");
const router = express.Router();
const authentication = require("../../../Resource/utils");
const FileController = require("../Controllers/FileController");
const { upload } = require("../../../Database/db");

router.post("/:doc_id/create", [authentication.validateToken,upload.single("file")], FileController.createFile);

router.get("/:id/find", authentication.validateToken, FileController.getFile);

router.get("/:doc_id/findAll", authentication.validateToken, FileController.getFiles);

router.delete("/:id/delete",  authentication.validateToken,FileController.deleteFile);

router.patch(
  "/:id/update",
  authentication.validateToken,
  FileController.updateFile
);

module.exports = router;
