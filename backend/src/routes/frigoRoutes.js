const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../Middleware/authMiddleware");

const {
  createFrigo,
  getFrigos,
  updateFrigo,
  deleteFrigo,
} = require("../controllers/frigoController");

// SECURITE: Lecture pour auth, CRUD pour admin
router.post("/", verifyToken, authorizeRoles("admin"), createFrigo);
router.get("/", verifyToken, getFrigos);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateFrigo);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteFrigo);

module.exports = router;
