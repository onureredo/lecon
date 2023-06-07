import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [16, 'Name cannot exceed 16 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Lastname is required'],
      maxlength: [16, 'Name cannot exceed 16 characters'],
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
      maxlength: [12, 'Username cannot exceed 12 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    bio: String,
    profileImage: String,
    bgImage: String,
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin', 'super'],
      default: 'user',
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model('User', userSchema);
