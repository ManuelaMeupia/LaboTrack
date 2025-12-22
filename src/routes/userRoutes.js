const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require("../controllers/userController");

router.post("/", createUser);       // Créer
router.get("/", getUsers);          // Lire
router.put("/:id", updateUser);     // Modifier
router.delete("/:id", deleteUser);  // Supprimer

module.exports = router;
