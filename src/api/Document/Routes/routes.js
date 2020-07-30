const express = require("express");
const router = express.Router();
const authentication = require("../../../Resource/utils");
const DocumentController = require("../Controllers/DocumentController");

router.post("/create", authentication.validateToken,DocumentController.createDocument);

router.get("/findAll", authentication.validateToken, DocumentController.getDocuments);

router.delete(
  "/:id/delete",
  authentication.validateToken,
  DocumentController.deleteDocument
);

router.patch(
  "/:id/update",
  authentication.validateToken,
  DocumentController.updateDocument
);

module.exports = router;
