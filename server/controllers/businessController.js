// import crypto from 'crypto';
import securePassword from 'secure-password';
import jwt from 'jsonwebtoken';
import Business from '../models/Business';

const pwd = securePassword();


class Businesses {
  static async signup(req, res) {
    const business = await new Business(req.body);
    const buf = Buffer.from(req.body.password);
    const hash = await pwd.hashSync(buf);
    business.password = hash;
    await business.save();
    res.status(201).json({
      message: 'user created',
      business: {
        id: business._id,
        business: business.businessname,
      },
    });
  }

  static async login(req, res) {
    const business = await Business.findOne({ email: req.body.email });
    const pass = Buffer.from(business.password);
    const buf = Buffer.from(req.body.password);
    const verify = await pwd.verifySync(buf, pass);
    if (!business || verify === securePassword.INVALID) {
      return res.status(400).json({
        message: 'Email or password not correct',
      });
    }
    res.status(200).json({
      messsge: 'welcome',
      user: {
        id: business._id,
        business: business.businessname,
        token: jwt.sign(
          {
            email: business.email,
            businessname: business.businessname,
            _id: business._id,
          },
          process.env.KEY,
        ),
      },
    });
  }
}


export default Businesses;
