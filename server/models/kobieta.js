const mongoose = require("mongoose");

const kobietaSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  value: Number,
  // Add other fields based on your CSV data
});

const Kobieta = mongoose.model("Kobieta", kobietaSchema);

module.exports = Kobieta;
