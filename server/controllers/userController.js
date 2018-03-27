// import crypto from 'crypto';
import securePassword from 'secure-password';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const pwd = securePassword();


class Users {
  static async signup(req, res) {
    const user = await new User(req.body);
    const buf = Buffer.from(req.body.password);
    const hash = await pwd.hashSync(buf);
    user.password = hash;
    await user.save();
    res.status(201).json({
      message: 'user created',
      user: {
        id: user._id,
        username: user.username,
      },
    });
  }

  static async login(req, res) {
    const user = await User.findOne({ email: req.body.email });
    const pass = Buffer.from(user.password);
    const buf = Buffer.from(req.body.password);
    const verify = await pwd.verifySync(buf, pass);
    if (!user || verify === securePassword.INVALID) {
      return res.status(400).json({
        message: 'Email or password not correct',
      });
    }
    res.status(200).json({
      messsge: 'welcome',
      user: {
        id: user._id,
        username: user.username,
        token: jwt.sign(
          {
            email: user.email,
            username: user.username,
            _id: user._id,
          },
          process.env.KEY,
        ),
      },
    });
  }

  static async userprofile(req, res) {
    const user = await User.findOne({ _id: req.user._id }, {
      password: 0,
      emailVerfication: 0,
      emailVerficationExpires: 0,
      resetPasswordToken: 0,
      resetPasswordExpires: 0,
    });
    res.status(200).json({
      message: 'successful',
      user,
    });
  }


  static async editprofile(req, res) {
    const user = await User.findOne({ _id: req.user._id }, {
      password: 0,
      emailVerfication: 0,
      emailVerficationExpires: 0,
      resetPasswordToken: 0,
      resetPasswordExpires: 0,
    });
    res.status(200).json({
      message: 'successful',
      user,
    });
  }
}



export default Users;
