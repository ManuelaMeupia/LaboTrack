const Box = require("../models/Box");

// 🔹 Créer une box
exports.createBox = async (req, res) => {
  try {
    const box = new Box(req.body);
    await box.save();
    res.status(201).json(box);
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

// Box d’un frigo précis
exports.getBoxesByFrigo = async (req, res) => {
  try {
    const boxes = await Box.find({
      frigoId: req.params.frigoId,
    }).populate("frigoId");

    res.json(boxes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
