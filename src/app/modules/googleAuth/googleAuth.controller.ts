// src/app/modules/Auth/GoogleAuth/googleAuth.controller.ts

import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse'; 
import config from '../../config';


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
    config.GOOGLE_CALLBACK_URL as string
);

// CORRECTED: Define a type for your session data
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

    googleCallback: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const code = req.query.code as string;

        if (!code) {
            console.error('Google OAuth callback: No authorization code received.');
            return res.redirect('http://localhost:3000/login?error=access_denied');
        }

        try {
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);

            const userInfoResponse = await oAuth2Client.request({
                url: 'https://www.googleapis.com/oauth2/v3/userinfo',
            });

            const userProfile: IGoogleUserProfile = userInfoResponse.data as IGoogleUserProfile;

            req.session = req.session || {};
            req.session.user = {
                id: userProfile.sub,
                name: userProfile.name,
                email: userProfile.email,
                picture: userProfile.picture,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
            };

            next(); 
        } catch (error) {
            console.error('Error during Google OAuth callback:', error);
            sendResponse(res, { 
                statusCode: 500,
                success: false,
                message: 'Google Sign-In Failed',
            });
        }
    }),

    // THIS IS THE CORRECTED FUNCTION
    googleCallbackRedirect: (req: Request, res: Response) => {
        if (req.session?.user) {
            console.log('Google login successful. Redirecting browser to frontend: http://localhost:3000');
            res.redirect('http://localhost:3000');
        } else {
            console.log('Google login failed after callback. Redirecting to frontend error page: http://localhost:3000/login?error=auth_failed_redirect');
            res.redirect('http://localhost:3000/login?error=auth_failed_redirect');
        }
    },

    logout: (req: Request, res: Response) => {
        req.session = null;
        res.redirect('http://localhost:3000/signin');
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