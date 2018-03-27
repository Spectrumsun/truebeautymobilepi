import mongoose from 'mongoose';

const addServiceSchema = mongoose.Schema({
  servicetype: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Service Required',
  },
  priceCategory: {
    type: Array,
    required: true,
    lowercase: true,
    default: ['regular', 'exclusive', 'premium'],
  },
  price: {
    type: Number,
    required: true,
  },
  businessname: {
    type: String,
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('AddService', addServiceSchema);
