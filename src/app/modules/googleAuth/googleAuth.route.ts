// src/app/modules/Auth/GoogleAuth/googleAuth.route.ts
import express from 'express';
import { GoogleAuthController } from './googleAuth.controller';

const router = express.Router();

// Route to initiate Google OAuth login
router.get('/google', GoogleAuthController.googleLogin);

// Google OAuth callback route
router.get(
  '/google/callback',
  GoogleAuthController.googleCallback,
  GoogleAuthController.googleCallbackRedirect,
);

// Logout for social login (if you want a separate one or a unified logout)
router.get('/logout', GoogleAuthController.logout);

export default router;
