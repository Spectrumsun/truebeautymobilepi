import express from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import { userController, businessController, AddServices } from '../controllers';
import { Auth, validator } from '../middleware/';

require('dotenv').config({ path: '.env' });

const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json({ message: 'True Beauty API' });
});

// user router
router.get(
  '/user/profile/',
  Auth.verifyToken,
  userController.userprofile,
);

router.post(
  '/user/signup',
  validator.signup,
  catchErrors(userController.signup),
);

router.post(
  '/user/login',
  validator.login,
  catchErrors(userController.login),
);

// business Route
router.post(
  '/business/signup',
  validator.businessLogin,
  catchErrors(businessController.signup),
);

router.post(
  '/business/login',
  catchErrors(businessController.login),
);

// service
router.get(
  '/business/service',
  AddServices.viewService,
);

router.get(
  '/business/service',
  catchErrors(AddServices.viewOneService),
);

router.get(
  '/business/service/:id',
  catchErrors(AddServices.viewOneService),
);

router.post(
  '/business/service/',
  Auth.verifyToken,
  catchErrors(AddServices.addService),
);

router.put(
  '/business/service/edit/:id',
  catchErrors(AddServices.editService),
);

router.delete(
  '/business/service/delete/:id',
  catchErrors(AddServices.deleteservice),
);


export default router;
