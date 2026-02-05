const express = require("express");
const router = express.Router();

const {
  createFrigo,
  getFrigos,
  updateFrigo,
  deleteFrigo,
} = require("../controllers/frigoController");

router.post("/", createFrigo);
router.get("/", getFrigos);
router.put("/:id", updateFrigo);
router.delete("/:id", deleteFrigo);

module.exports = router;
