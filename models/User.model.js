const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    avatar:{ 
      Stype: String,  
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
