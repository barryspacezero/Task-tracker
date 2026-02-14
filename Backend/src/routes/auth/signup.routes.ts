import express from 'express';
const router = express.Router();
import UserController from '../../controllers/auth.controller';
import {UserSignUpSchema, UserSignInSchema} from "../../schemas/users.schema";
import {validate} from "../../middleware/validation";


router.post('/signup', validate(UserSignUpSchema),UserController.signup);
router.post('/login', validate(UserSignInSchema), UserController.login);

export default router;