const mongoose = require("mongoose");

const frigoSchema = new mongoose.Schema(
  {
    nom: String,
    localisation: String,
    capacite: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Frigo", frigoSchema);
