const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../Middleware/authMiddleware");

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// SECURITE: Toutes les routes utilisateurs necessitent admin
router.post("/", verifyToken, authorizeRoles("admin"), createUser);
router.get("/", verifyToken, authorizeRoles("admin"), getUsers);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateUser);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUser);

module.exports = router;
