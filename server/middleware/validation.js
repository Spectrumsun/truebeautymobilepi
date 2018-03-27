import AddService from '../models/AddService';

class Validate {
  static signup(req, res, next) {
    req.checkBody(
      'username',
      'You must supply a username!',
    )
      .notEmpty();
    req.checkBody(
      'phone',
      'You must supply a Phone Number! 11 Digit',
    )
      .notEmpty().isLength({ min: 11 });
    req.checkBody(
      'address',
      'You must supply your address!',
    )
      .notEmpty();
    req.checkBody(
      'email',
      'That Email is not valid!',
    )
      .isEmail();
    req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false,
    });
    req.checkBody(
      'password',
      'Password Cannot be Blank! Not less than five charaters',
    )
      .notEmpty().isLength({ min: 6 });
    req.checkBody(
      'confirmPassword',
      'Oops! Your passwords do not match',
    )
      .equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
      const errs = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Sign up Errors',
        errs,
      });
      return;
    }
    next();
  }

  static login(req, res, next) {
    req.checkBody(
      'email',
      'That Email is not valid!',
    )
      .isEmail();
    req.sanitizeBody('email')
      .normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
      });
    req.checkBody(
      'password',
      'Password Cannot be Blank!',
    )
      .notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      const errs = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Login Errors',
        errs,
      });
      return;
    }
    next(); // there were no errors!
  }

  static businessLogin(req, res, next) {
    req.checkBody(
      'businessname',
      'You must supply a username!',
    ).notEmpty();
    req.checkBody(
      'location.address',
      'You must supply a Address!',
    ).notEmpty();
    req.checkBody(
      'location.coordinates',
      'You must supply coordinates for your business Location!',
    ).notEmpty();
    req.checkBody(
      'phone',
      'You must supply a Phone Number! 11 Digit',
    ).notEmpty().isLength({ min: 11 });
    req.checkBody(
      'email',
      'That Email is not valid!',
    ).isEmail();
    req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false,
    });
    req.checkBody(
      'available',
      'Available Cannot be Blank!',
    ).notEmpty();
    req.checkBody(
      'password',
      'Password Cannot be Blank! Not less than five charaters',
    ).notEmpty().isLength({ min: 6 });
    req.checkBody(
      'confirmPassword',
      'Oops! Your passwords do not match',
    ).equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
      const errs = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Sign up Errors',
        errs,
      });
      return;
    }
    next();
  }


  static addservice(req, res, next) {
    const owner = AddService.findOne({ _id: req.prams.id });
    if (owner.business._id !== req.user.businessId) {
      return res.status(400).json({ message: 'Ypu are not the owner of the service' });
    }
    next();
  }

  static addProduct(req, res, next) {
    req.checkBody('category', 'You must supply a Category!').notEmpty();
    req.checkBody('productname', 'You must supply a Productname!').notEmpty();
    req.checkBody('price', 'You must supply a Price!').notEmpty();
    req.checkBody('picture', 'You must add a Picture!').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      req.flash('Add Product error', errors.map(err => err.msg));
      res.render('productform', { title: 'Product Form', body: req.body, flashes: req.flash() });
      return; // stop the fn from running
    }
    next(); // there were no errors!
  }

  static payOrder(req, res, next) {
    req.checkBody('location', 'You must supply a location').notEmpty();
    req.checkBody('time', 'You must supply the time').notEmpty();
    req.checkBody('address', 'You must supply your Aaddress').notEmpty();
    req.checkBody('date', 'You must supply the date').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      req.flash('Order Error', errors.map(err => err.msg));
      res.render('orderservice', { title: 'Order Product', body: req.body, flashes: req.flash() });
      return; // stop the fn from running
    }
    next(); // there were no errors!
  }
}


export default Validate;
