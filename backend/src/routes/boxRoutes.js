const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../Middleware/authMiddleware");

const {
  createBox,
  getAllBoxes,
  getBoxesByFrigo,
} = require("../controllers/boxController");

// SECURITE: Lecture pour auth, creation pour admin
router.post("/", verifyToken, authorizeRoles("admin"), createBox);
router.get("/", verifyToken, getAllBoxes);

// route intelligente
router.get("/frigo/:frigoId", verifyToken, getBoxesByFrigo);

module.exports = router;
