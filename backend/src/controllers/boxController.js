const Box = require("../models/Box");

// 🔹 Créer une box
exports.createBox = async (req, res) => {
  try {
    const box = new Box(req.body);
    await box.save();
    res.status(201).json(box);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Lire toutes les box
exports.getBoxs = async (req, res) => {
  try {
    const boxs = await Box.find().populate("frigoId");
    res.json(boxs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Modifier une box
exports.updateBox = async (req, res) => {
  try {
    const box = await Box.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(box);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Supprimer une box
exports.deleteBox = async (req, res) => {
  try {
    await Box.findByIdAndDelete(req.params.id);
    res.json({ message: "Box supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
