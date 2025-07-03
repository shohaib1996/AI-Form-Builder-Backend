import { Request, Response } from 'express';
import * as PaymentService from './payment.servies';
import { AuthRequest } from '../../middlewares/auth';
import { userPlanTypes } from '../users/user.constant';

export const checkout = async (req: Request, res: Response) => {
  try {
    const items = req.body.items;

    console.log('Items received for checkout:', items);

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: 'Items are required' });
      return;
    }

    const session = await PaymentService.createCheckoutSession(items);
    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong while creating checkout session',
      });
  }
};

export const complete = async (req: AuthRequest, res: Response) => {
  const sessionId = req.query.session_id as string;

  try {
    const { session, lineItems } =
      await PaymentService.getCheckoutResult(sessionId);
    console.log(JSON.stringify({ session, lineItems }, null, 2));

    if (!req.user || !req.user._id) {
      res
        .status(401)
        .json({ success: false, message: 'Unauthorized: User not found' });
      return;
    }
    const userId = req.user._id;
    const planName = userPlanTypes.PREMIUM;

     if (userId) {
      await PaymentService.addSubscription({
        userId,
        planName,
        status: 'active',
        stripeSubscriptionId: typeof session.subscription === 'string'
          ? session.subscription
          : (session.subscription && session.subscription.id)
            ? session.subscription.id
            : session.id,
        startedAt: new Date(),
        endsAt: null,
      });

      console.log(`✅ Subscription added for user ${userId}`);
    } else {
      console.warn('⚠️ No userId found in session metadata');
    }

    // Render a success page or redirect
    res.send('✅ Your payment was successful and subscription is now active!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving payment result');
  }
};

export const cancel = (_req: Request, res: Response) => {
  res.redirect('/');
};
