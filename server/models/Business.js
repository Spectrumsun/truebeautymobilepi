import mongoose from 'mongoose';
import crypto from 'crypto';

const businessSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please Supply an email address',
  },
  businessname: {
    type: String,
    required: 'Please supply a Business Name',
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
  available: {
    type: String,
    required: 'Add availblity',
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      required: 'Add location',
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!',
    }],
    address: {
      type: String,
      required: 'You must supply an address!',
    },
  },
  emailVerfication: {
    type: String,
    default: crypto.randomBytes(20).toString('hex'),
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Business', businessSchema);
