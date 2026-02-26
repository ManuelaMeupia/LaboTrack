const Box = require("../models/Box");
const mongoose = require("mongoose");

// 🔹 Créer une box
exports.createBox = async (req, res) => {
  try {
      const data = {
        ...req.body,
        createdBy: req.user?.id,
      };

      const box = new Box(data);
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

// Modifier box (enregistre updatedBy)
exports.updateBox = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, capacite } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const box = await Box.findByIdAndUpdate(id, { nom, capacite }, { new: true });

    if (!box) return res.status(404).json({ message: "Box non trouvée" });

    if (req.user?.id) {
      box.updatedBy = req.user.id;
      await box.save();
    }

    res.json({ message: "Box modifiée", box });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
