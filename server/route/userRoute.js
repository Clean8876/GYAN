import express from 'express'
import { authUser, regUser,sendOTP,logUser } from "../controller/Auth.js";
import { resetPassword,restLink } from '../controller/resetPassword.js';
/* import { createCategory ,delCategory,getCategory} from '../controller/Category.js';
 */


export  const router = express.Router()


router.post('/register',regUser);
router.post('/login',authUser);
router.post('/logout', logUser);
router.post('/sendotp',sendOTP);
router.post('/resetpassword',resetPassword);
router.post('/resetlink',restLink);



