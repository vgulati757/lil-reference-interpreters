
import mongoose from 'mongoose';
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },

  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    unique: [true, 'This email already exists'],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 9,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user needs to confirm the password'],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: 'Password and passwordConfirm fields must be the same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', function (next) {
  // Only run function if password was actually modified
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  // Only run function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with salt of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.passwordConfirm = undefined;

  next();
});

// always find active users
userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  // Plain Reset Token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Store Encrypted Reset Token in DB
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Setting Token Reset Time
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // Returning Plain Reset Token
  return resetToken;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // Converting ISO date into milliseconds
  const changedTimestamp =
    this.passwordChangedAt &&
    parseInt(this.passwordChangedAt.getTime() / 1000, 10);
  // Check if user has changed the password
  if (this.passwordChangedAt) {
    return JWTTimestamp < changedTimestamp;
  }
  // password was not changed
  return false;
};
const User = mongoose.model('User', userSchema);

export default User;
