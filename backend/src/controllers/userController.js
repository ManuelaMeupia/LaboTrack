const User = require("../models/User");
const bcrypt = require("bcrypt");

// 🔹 Créer
exports.createUser = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;

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
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur créé", user });
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

    await User.findByIdAndUpdate(id, { nom, email, role });

    res.json({ message: "Utilisateur modifié" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Supprimer
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
