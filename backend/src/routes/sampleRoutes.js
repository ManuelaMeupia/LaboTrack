const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../Middleware/authMiddleware");

const {
  createSample,
  getSamples,
  deleteSample,
  searchSampleByIdentifiant,
} = require("../controllers/sampleController");

// SECURITE: Lecture pour tous (auth), creation pour admin/personnel, suppression pour admin
router.post("/", verifyToken, authorizeRoles("admin", "personnel"), createSample);
router.get("/", verifyToken, getSamples);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteSample);
router.get("/search/:identifiant", verifyToken, searchSampleByIdentifiant);

module.exports = router;


