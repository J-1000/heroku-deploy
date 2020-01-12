const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  place: { type: { type: String }, coordinates: [Number] }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

locationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Locations", locationSchema);
