const mongoose = require("mongoose");

const AvailabilitySchema = mongoose.Schema({
  start: Date,
  end: Date,
  eventId: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  available: Boolean,
});

module.exports = mongoose.model("Availability", AvailabilitySchema);
