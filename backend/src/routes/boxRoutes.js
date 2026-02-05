const express = require("express");
const router = express.Router();

const {
  createBox,
  getBoxs,
  updateBox,
  deleteBox,
} = require("../controllers/boxController");

router.post("/", createBox);
router.get("/", getBoxs);
router.put("/:id", updateBox);
router.delete("/:id", deleteBox);

module.exports = router;
