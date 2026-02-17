const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema(
  {
    identifiant: {
      type: String,
      required: true,
    },

    categorie: {
      type: String,
      required: true,
      enum: [
        "Sang",
        "Plasma",
        "Sérum",
        "Selles",
        "Urine",
        "Crachats",
        "Microfilaires",
        "Snipes",
        "DBS",
        "Réactifs",
      ],
    },

    sexe: {
      type: String,
      enum: ["Masculin", "Féminin"],
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    localite: {
      type: String,
      required: true,
    },

    communaute: {
      type: String,
      required: true,
    },

    frigoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Frigo",
      required: true,
    },

    boxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Box",
      required: true,
    },

    position: {
      type: Number,
      min: 1,
      max: 96,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sample", sampleSchema);
