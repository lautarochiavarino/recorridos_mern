const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    places: {
      type: [String],
      required: true
    },
    activities: {
      type: [String],
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Tour = mongoose.model('tour', TourSchema);