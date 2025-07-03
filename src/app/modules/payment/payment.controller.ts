import { Request, Response } from 'express';
import * as PaymentService from './payment.servies';

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
    res.status(500).json({ success: false, message: 'Something went wrong while creating checkout session' });
  }
};

export const complete = async (req: Request, res: Response) => {
  const sessionId = req.query.session_id as string;

  try {
    const { session, lineItems } = await PaymentService.getCheckoutResult(sessionId);
    console.log(JSON.stringify({ session, lineItems }, null, 2));

    res.send('Your payment was successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving payment result');
  }
};

export const cancel = (_req: Request, res: Response) => {
  res.redirect('/');
};
