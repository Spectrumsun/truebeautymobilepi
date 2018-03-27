// import crypto from 'crypto';
import securePassword from 'secure-password';
import jwt from 'jsonwebtoken';
import AddService from '../models/AddService';

class AddServices {
  static async viewService(req, res) {
    const service = await AddService.find().populate('businessId', {
      businessname: 1,
      email: 1,
      location: 1,
      price: 1,
      picture: 1,
      pictureId: 1,
      available: 1,
    });
    res.status(200).json({
      message: 'successfull',
      service,
    });
  }

  static async viewOneService(req, res) {
    const service = await AddService.findOne({ _id: req.params.id }).populate('businessId', {
      businessname: 1,
      email: 1,
      location: 1,
      price: 1,
      picture: 1,
      pictureId: 1,
      available: 1,
    });
    res.status(201).json({
      message: 'Successfull',
      service,
    });
  }

  static async addService(req, res) {
    /* eslint-disable */
    req.body.businessname = req.user.businessname,
    req.body.businessId = req.user._id;
    const service = await (new AddService(req.body)).save();
    res.status(201).json({
      mmessage: 'Service  Added',
      service,
    });
  }

  static async editService(req, res) {
    const service = await AddService.findOneAndUpdate({ _id: req.params.id }, req.body).exec();
    res.status(200).json({ message: 'Service Edited' });
  }

  static async deleteservice(req, res) {
    const service = await AddService.remove({ _id: req.params.id });
    res.status(200).json({ message: 'Service Removed',});
  }
}


export default AddServices;
