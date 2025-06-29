import express from "express";
import { signup, signin, updateProfile, resetPassword } from "./user.controller";
import {
  signupSchema,
  signinSchema,
  updateProfileSchema,
  resetPasswordSchema,
} from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signup);
router.post("/signin", validateRequest(signinSchema), signin);
router.patch("/update/:id", validateRequest(updateProfileSchema), updateProfile);
router.post("/reset-password/:id", validateRequest(resetPasswordSchema), resetPassword);

export default router;
