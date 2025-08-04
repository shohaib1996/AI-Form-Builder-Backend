import config from '../../config';
import stripe from '../../utils/stripe';
import { Subscription } from './subscription.model';
import { User } from '../users/user.model';

interface LineItem {
  name: string;
  amount: number; // in USD cents (example: 5000 = $50)
  currency: string;
  quantity: number;
}

interface CreateSubscriptionData {
  userId: string;
  planName: string;
  status: string;
  stripeSubscriptionId: string;
  startedAt: Date;
  endsAt: Date | null;
}

export const createCheckoutSession = async (items: LineItem[]) => {
  const line_items = items.map((item) => ({
    price_data: {
      currency: item.currency,
      product_data: {
        name: item.name,
      },
      unit_amount: item.amount * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: config.ALLOWED_COUNTRIES as any[],
    },
    success_url: `${config.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.BASE_URL}/cancel`,
  });

  return session;
};

export const getCheckoutResult = async (sessionId: string) => {
  const sessionPromise = stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent.payment_method'],
  });

  const lineItemsPromise = stripe.checkout.sessions.listLineItems(sessionId);

  const [session, lineItems] = await Promise.all([
    sessionPromise,
    lineItemsPromise,
  ]);

  return { session, lineItems };
};

export const addSubscription = async (data: CreateSubscriptionData) => {
  const subscription = new Subscription({
    userId: data.userId,
    planName: data.planName,
    status: data.status,
    stripeSubscriptionId: data.stripeSubscriptionId,
    startedAt: data.startedAt,
    endsAt: data.endsAt,
  });

  await subscription.save();

  if (data.planName === 'premium') {
    await User.findByIdAndUpdate(data.userId, {
      formLimit: 500,
      planType: 'premium',
    });
  }

  return subscription;
};

export const getSubscriptionByUserId = async (userId: string) => {
  const subscriptions = await Subscription.find({ userId });
  return subscriptions;
};
