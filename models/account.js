const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const account = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    bio: {
      type: String,
      default: "Bio Here",
    },
    social: {
      type: [String],
      default: ["One", "Two"],
    },
    topmaps: {
      type: [String],
      default: ["Nact", "Kino", "Origins"],
    },
    topww: {
      type: [String],
      default: ["Ice Staff", "Thundergun", "MK2"],
    },
    perks: {
      type: [Number],
      default: [1, 2, 3, 4],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("account", account);
