const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("./models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté");

    const hashedPassword = await bcrypt.hash("123456", 10);

    // Supprimer les anciens users (optionnel)
    await User.deleteMany({});

    // Créer l'admin
    const admin = await User.create({
      nom: "Admin",
      email: "admin@labotrack.com",
      mot_de_passe: hashedPassword,
      role: "admin"
    });

    console.log("✓ Admin créé avec succès!");
    console.log("Email: admin@labotrack.com");
    console.log("Mot de passe: 123456");
    console.log("Rôle: admin");
    
    process.exit(0);
  } catch (error) {
    console.error("Erreur:", error.message);
    process.exit(1);
  }
}

createAdmin();
