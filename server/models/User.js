import mongoose from 'mongoose';
import crypto from 'crypto';
import securePassword from 'secure-password';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please Supply an email address',
  },
  username: {
    type: String,
    required: 'Please supply a username',
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: 'Please supply a Password',
  },
  phone: {
    type: Number,
    required: 'Please supply a phone number',
    unique: true,
  },
  picture: {
    type: String,
    required: 'Add picture secure url',
  },
  pictureId: {
    type: String,
    required: 'Add picture public Id',
  },
  category: {
    type: String,
    required: 'Add your category',
  },
  address: {
    type: String,
    required: 'Add your address',
  },
  emailVerfication: {
    type: String,
    default: crypto.randomBytes(20).toString('hex'),
  },
  emailVerficationExpires: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);