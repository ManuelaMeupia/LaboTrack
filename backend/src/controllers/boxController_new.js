const Box = require("../models/Box");
const mongoose = require("mongoose");

// 🔹 Créer une box
exports.createBox = async (req, res) => {
  try {
    const { nom, frigoId, capacite } = req.body;

    // Validation
    if (!nom || !frigoId || capacite === undefined) {
      return res.status(400).json({ message: "Tous les champs sont requis (nom, frigoId, capacite)" });
    }

    if (!mongoose.Types.ObjectId.isValid(frigoId)) {
      return res.status(400).json({ message: "FrigoId invalide" });
    }

    if (capacite < 0) {
      return res.status(400).json({ message: "La capacité doit être positive" });
    }

    const box = new Box(req.body);
    await box.save();
    res.status(201).json({ message: "Box créée", box });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 Toutes les box
exports.getAllBoxes = async (req, res) => {
  try {
    const boxes = await Box.find().populate("frigoId");
    res.json(boxes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Box d'un frigo précis
exports.getBoxesByFrigo = async (req, res) => {
  try {
    const { frigoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(frigoId)) {
      return res.status(400).json({ message: "FrigoId invalide" });
    }

    const boxes = await Box.find({
      frigoId: frigoId,
    }).populate("frigoId");

    res.json(boxes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
