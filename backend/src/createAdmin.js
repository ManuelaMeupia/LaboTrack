const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("./models/User");

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("123456", 10);

  await User.deleteMany({}); // supprime anciens users

  await User.create({
    nom: "Admin",
    email: "admin@labotrack.com",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin créé !");
  process.exit();
}

createAdmin();
