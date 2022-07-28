const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
    tour:{
      type: moongose.Schema.Types.ObjectId,
      ref: 'tour'
    },
    address: {
      type: [String],
      required: true
    },
  },
 



  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('user', UserSchema);