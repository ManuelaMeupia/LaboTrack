const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * CREER un utilisateur (ADMIN)
 */
exports.createUser = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;

    // Vérifier si email existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const user = new User({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * LISTER tous les utilisateurs
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-mot_de_passe");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * MODIFIER un utilisateur
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).select("-mot_de_passe");

    res.json({
      message: "Utilisateur modifié",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * SUPPRIMER un utilisateur
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({ message: "Utilisateur supprimé" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
