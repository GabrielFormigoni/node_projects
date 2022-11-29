const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nome do produto deve ser fornecido"],
  },
  price: {
    type: Number,
    required: [true, "preço deve ser fornecido"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "Não existe suporte para a compania {VALUE}",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
