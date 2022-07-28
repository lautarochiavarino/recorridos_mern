const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tour",
    },
    address: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = Place = mongoose.model("place", PlaceSchema);
