const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      trim: true
    },

    district: {
      type: String,
      required: true,
      trim: true
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate state + district
locationSchema.index(
  { state: 1, district: 1 },
  { unique: true }
);

module.exports = mongoose.model("Location", locationSchema);