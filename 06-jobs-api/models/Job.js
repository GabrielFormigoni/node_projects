const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Por favor, informe o nome da compania."],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Por favor, informe a posição."],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "pending", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Por favor, informe o usuário"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
