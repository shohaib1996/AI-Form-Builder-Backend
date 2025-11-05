import { Request, Response } from 'express';
import * as PaymentService from './payment.servies';
import { AuthRequest } from '../../middlewares/auth';
import { userPlanTypes } from '../users/user.constant';
import catchAsync from '../../utils/catchAsync';
import { updateProfileService } from '../users/user.services';

export const checkout = async (req: AuthRequest, res: Response) => {
  try {
    const items = req.body.items;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
      return;
    }

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: 'Items are required' });
      return;
    }

    const session = await PaymentService.createCheckoutSession(items, userId as any);
    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating checkout session',
    });
  }
};

export const complete = async (req: Request, res: Response) => {
  const sessionId = req.query.session_id as string;

  try {
    const { session } = await PaymentService.getCheckoutResult(sessionId);

    const userId = session.client_reference_id;
    const planName = userPlanTypes.PREMIUM;

    if (!userId) {
      res.status(400).json({ success: false, message: 'User ID not found in session' });
      return;
    }

    const subscription = {
      userId,
      planName,
      status: 'active',
      stripeSubscriptionId:
        typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription && session.subscription.id
            ? session.subscription.id
            : session.id,
      startedAt: new Date(),
      endsAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    };

    await PaymentService.addSubscription(subscription);

    await updateProfileService(userId, { planType: userPlanTypes.PREMIUM });

    res.status(200).json({
      success: true,
      message: 'Your payment was successful and subscription is now active!',
      subscription: {
        planName: subscription.planName,
        status: subscription.status,
        startedAt: subscription.startedAt,
        endsAt: subscription.endsAt,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Error retrieving payment result' });
  }
};

export const cancel = (_req: Request, res: Response) => {
  res.redirect('/pricing');
};

export const getSubscription = catchAsync(
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user || !req.user._id) {
        res
          .status(401)
          .json({ success: false, message: 'Unauthorized: user not found' });
        return;
      }
      const userId = req.user._id;
      const subscriptions =
        await PaymentService.getSubscriptionByUserId(userId);
      res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving subscriptions');
    }
  },
);
