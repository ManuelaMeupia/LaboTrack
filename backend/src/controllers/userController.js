const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// 🔹 Créer
exports.createUser = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;

    // Validation
    if (!nom || !email || !mot_de_passe || !role) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    if (!["admin", "personnel", "visiteur"].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    if (mot_de_passe.length < 6) {
      return res.status(400).json({ message: "Mot de passe doit faire au moins 6 caractères" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const user = new User({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role,
      createdBy: req.user?.id,
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur créé", user: { id: user._id, nom: user.nom, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Lire tous
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-mot_de_passe");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Modifier
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    if (role && !["admin", "personnel", "visiteur"].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    const user = await User.findByIdAndUpdate(id, { nom, email, role }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (req.user?.id) {
      user.updatedBy = req.user.id;
      await user.save();
    }

    res.json({ message: "Utilisateur modifié", user: { id: user._id, nom: user.nom, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Supprimer
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
