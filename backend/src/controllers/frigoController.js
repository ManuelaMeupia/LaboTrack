const Frigo = require("../models/Frigo");

// 🔹 Créer un frigo
exports.createFrigo = async (req, res) => {
  try {
    const frigo = new Frigo(req.body);
    await frigo.save();
    res.status(201).json(frigo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Lire tous les frigos
exports.getFrigos = async (req, res) => {
  try {
    const frigos = await Frigo.find();
    res.json(frigos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Modifier un frigo
exports.updateFrigo = async (req, res) => {
  try {
    const frigo = await Frigo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(frigo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Supprimer un frigo
exports.deleteFrigo = async (req, res) => {
  try {
    await Frigo.findByIdAndDelete(req.params.id);
    res.json({ message: "Frigo supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
