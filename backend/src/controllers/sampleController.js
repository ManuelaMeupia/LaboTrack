const Sample = require("../models/Sample");

// Créer
exports.createSample = async (req, res) => {
  try {
    console.log("BODY REÇU :", req.body);

    const sample = new Sample(req.body);
    await sample.save();

    res.status(201).json(sample);

  } catch (error) {
    console.error("ERREUR MONGOOSE :", error);
    res.status(400).json({ error: error.message });
  }
};



// Lire tous
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
    await Sample.findByIdAndDelete(req.params.id);
    res.json({ message: "Échantillon supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
