// src/app/modules/Auth/GoogleAuth/googleAuth.controller.ts

import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';
import { findOrCreateGoogleUser } from '../../modules/users/user.services';
import { generateToken } from '../../utils/generateToken';

interface IGoogleUserProfile {
  sub: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified: boolean;
  locale?: string;
}

const oAuth2Client = new OAuth2Client(
  config.GOOGLE_CLIENT_ID as string,
  config.GOOGLE_CLIENT_SECRET as string,
  config.GOOGLE_CALLBACK_URL as string,
);

declare module 'express-serve-static-core' {
  interface Request {
    session: {
      user?: {
        id: string;
        name: string;
        email: string;
        picture?: string;
        accessToken?: string | null;
        refreshToken?: string | null;
      };
      token?: string; // Add token to session
    } | null;
  }
}

export const GoogleAuthController = {
  googleLogin: catchAsync(async (req: Request, res: Response) => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email', 'openid'],
      prompt: 'consent',
    });
    res.redirect(authorizeUrl);
  }),

  googleCallback: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const code = req.query.code as string;

      if (!code) {
        console.error('Google OAuth callback: No authorization code received.');
        return res.redirect('https://www.aiformgenerator.cloud/login?error=access_denied');
      }

      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        const userInfoResponse = await oAuth2Client.request({
          url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        });

        const userProfile: IGoogleUserProfile =
          userInfoResponse.data as IGoogleUserProfile;

        // Find or create user in your database
        const user = await findOrCreateGoogleUser({
          email: userProfile.email,
          name: userProfile.name,
          picture: userProfile.picture,
        });

        // Generate JWT token
        const token = generateToken(user);

        req.session = req.session || {};
        req.session.user = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          picture: user.photo,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        };
        req.session.token = token; // Store token in session

        next(); // Proceed to googleCallbackRedirect
      } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        sendResponse(res, {
          statusCode: 500,
          success: false,
          message: 'Google Sign-In Failed',
        });
      }
    },
  ),

  googleCallbackRedirect: (req: Request, res: Response) => {
    if (req.session?.user && req.session.token) {
      console.log(
        'Google login successful. Redirecting browser to frontend: http://localhost:3000',
      );
      // Redirect with token in query parameter
      res.redirect(
        `https://www.aiformgenerator.cloud/google-redirect?token=${req.session.token}`,
      );
    } else {
      console.log(
        'Google login failed after callback. Redirecting to frontend error page: https://www.aiformgenerator.cloud/login?error=auth_failed_redirect',
      );
      res.redirect('https://www.aiformgenerator.cloud/login?error=auth_failed_redirect');
    }
  },

  logout: (req: Request, res: Response) => {
    req.session = null;
    res.redirect('https://www.aiformgenerator.cloud/signin');
  },

  ensureAuthenticated: (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.user) {
      return next();
    }
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'Unauthorized: Please log in.',
    });
  },
};
