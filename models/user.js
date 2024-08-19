const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 3,
      required: true,
    },
    birthday: {
      mm: {
        type: Number,
        min: 1,
        max: 12,
        required: true,
      },
      dd: {
        type: Number,
        min: 1,
        max: 31,
        required: true,
      },
      yyyy: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
        required: true,
      },
    },
    verified: {
      type: Boolean,
      trim: true,
      required: true,
      default: false,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
      default: function () {
        return Math.floor(1000 + Math.random() * 9000);
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);
