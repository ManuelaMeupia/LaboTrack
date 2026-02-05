// const express = require("express");
// const router = express.Router();

// router.post("/login", (req, res) => {
//   res.json({ message: "Route login OK" });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");

router.post("/login", login);

module.exports = router;

