const mongoose = require("mongoose");

const PairedSchema = mongoose.Schema({
  start: Date,
  end: Date,
  eventId: String,
  paired: Boolean,
  requestingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  respondingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Paired", PairedSchema);
