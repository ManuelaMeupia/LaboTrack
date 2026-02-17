const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const frigoRoutes = require("./routes/frigoRoutes");
const boxRoutes = require("./routes/boxRoutes");
const sampleRoutes = require("./routes/sampleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/frigos", frigoRoutes);
app.use("/api/boxes", boxRoutes); 
app.use("/api/samples", sampleRoutes);

module.exports = app;
