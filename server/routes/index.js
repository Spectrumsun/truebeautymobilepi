import express from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import { userController } from '../controllers';
import { Auth, validator } from '../middleware/';

require('dotenv').config({ path: '.env' });

const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json({ message: 'True Beauty API' });
});

// user router

router.post(
  '/user/signup',
  catchErrors(userController.signup),
);

router.post(
  '/user/login',
  catchErrors(userController.login),
);


export default router;
