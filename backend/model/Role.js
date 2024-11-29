const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
