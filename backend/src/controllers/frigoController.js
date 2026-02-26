const Frigo = require("../models/Frigo");
const mongoose = require("mongoose");

// 🔹 Créer un frigo
exports.createFrigo = async (req, res) => {
  try {
    const { nom, localisation, capacite } = req.body;

    // Validation
    if (!nom || !localisation || capacite === undefined) {
      return res.status(400).json({ message: "Tous les champs sont requis (nom, localisation, capacite)" });
    }

    if (capacite < 0) {
      return res.status(400).json({ message: "La capacité doit être positive" });
    }

    const data = {
      ...req.body,
      createdBy: req.user?.id,
    };

    const frigo = new Frigo(data);
    await frigo.save();
    res.status(201).json({ message: "Frigo créé", frigo });
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const frigo = await Frigo.findByIdAndUpdate(id, req.body, { new: true });

    if (!frigo) {
      return res.status(404).json({ message: "Frigo non trouvé" });
    }

    // enregistrer updatedBy si présent
    if (req.user?.id) {
      frigo.updatedBy = req.user.id;
      await frigo.save();
    }

    res.json({ message: "Frigo modifié", frigo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Supprimer un frigo
exports.deleteFrigo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const frigo = await Frigo.findByIdAndDelete(id);

    if (!frigo) {
      return res.status(404).json({ message: "Frigo non trouvé" });
    }

    res.json({ message: "Frigo supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
