const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
      unique: true,
    },
    name: {
      type: String,
    },
    mob_no: {
      type: Number,
      max: 10,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    profile_picture: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
