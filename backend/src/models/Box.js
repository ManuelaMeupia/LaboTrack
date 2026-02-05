const mongoose = require("mongoose");

const boxSchema = new mongoose.Schema(
  {
    nom: String,
    frigoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Frigo",
    },
    capacite: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Box", boxSchema);
