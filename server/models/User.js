import mongoose from 'mongoose';
import crypto from 'crypto';

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
    default: 'picture.png',
    required: 'Add picture secure url',
  },
  pictureId: {
    type: String,
    default: 'pictureid',
    required: 'Add picture public Id',
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


userSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
