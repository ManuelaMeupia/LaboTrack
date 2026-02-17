const express = require("express");
const router = express.Router();


const {
  createSample,
  getSamples,
  deleteSample,
  searchSampleByIdentifiant,
} = require("../controllers/sampleController");

router.post("/", createSample);
router.get("/", getSamples);
router.delete("/:id", deleteSample);
router.get("/search/:identifiant", searchSampleByIdentifiant);

module.exports = router;


