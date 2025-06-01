const mongoose = require("mongoose");

const userInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  interactionType: { type: String, enum: ["view", "click", "purchase"], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserInteraction", userInteractionSchema);
