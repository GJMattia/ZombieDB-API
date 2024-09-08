const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
    },
    rating: {
      type: {
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
      },
      default: { likes: 0, dislikes: 0 },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", post);
