const Sample = require("../models/Sample");
const mongoose = require("mongoose");

// Créer
exports.createSample = async (req, res) => {
  try {
    console.log("BODY REÇU :", req.body);

    // Validation basique
    const { identifiant, categorie, sexe, age, localite, communaute, frigoId, boxId, position } = req.body;

    if (!identifiant || !categorie || !sexe || !age || !localite || !communaute || !frigoId || !boxId || position === undefined) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérifier que frigoId et boxId sont des ObjectId valides
    if (!mongoose.Types.ObjectId.isValid(frigoId) || !mongoose.Types.ObjectId.isValid(boxId)) {
      return res.status(400).json({ message: "IDs invalides (frigoId ou boxId)" });
    }

    // Vérifier que position est entre 1 et 96
    if (position < 1 || position > 96) {
      return res.status(400).json({ message: "Position doit être entre 1 et 96" });
    }

    const data = {
      ...req.body,
      createdBy: req.user?.id,
    };

    const sample = new Sample(data);
    await sample.save();

    res.status(201).json({ message: "Échantillon créé", sample });

  } catch (error) {
    console.error("ERREUR MONGOOSE :", error);
    
    // Gestion des erreurs de validation Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Erreur de validation", errors: messages });
    }

    res.status(400).json({ error: error.message });
  }
};

// Lire tous
exports.getSamples = async (req, res) => {
  try {
    const samples = await Sample.find()
      .populate("frigoId")
      .populate({
        path: "boxId",
        populate: {
          path: "frigoId",
        },
      });

    res.json(samples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recherche par identifiant
exports.searchSampleByIdentifiant = async (req, res) => {
  try {
    const { identifiant } = req.params;

    if (!identifiant) {
      return res.status(400).json({ message: "Identifiant requis" });
    }

    const sample = await Sample.findOne({ identifiant })
      .populate("frigoId")
      .populate("boxId");

    if (!sample) {
      return res.status(404).json({ message: "Échantillon non trouvé" });
    }

    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer
exports.deleteSample = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const sample = await Sample.findByIdAndDelete(id);

    if (!sample) {
      return res.status(404).json({ message: "Échantillon non trouvé" });
    }

    res.json({ message: "Échantillon supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
