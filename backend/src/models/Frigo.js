const mongoose = require("mongoose");

const frigoSchema = new mongoose.Schema(
  {
    nom: String,
    localisation: String,
    capacite: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Frigo", frigoSchema);
