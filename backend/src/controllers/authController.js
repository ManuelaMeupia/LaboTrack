const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    console.log("BODY RECU:", req.body);

    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Vérifie que JWT_SECRET existe
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET manquant" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("ERREUR LOGIN:", error);
    res.status(500).json({ message: error.message });
  }
};
