const express = require("express");
const router = express.Router();

const {
  createBox,
  getAllBoxes,
  getBoxesByFrigo,
} = require("../controllers/boxController");

router.post("/", createBox);
router.get("/", getAllBoxes);

// 🔥 route intelligente
router.get("/frigo/:frigoId", getBoxesByFrigo);

module.exports = router;
