const mongoose = require("mongoose");

const mezczyznaSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  value: Number,
  // Add other fields based on your CSV data
});

const Mezczyzna = mongoose.model("Mezczyzna", mezczyznaSchema);

module.exports = Mezczyzna;
