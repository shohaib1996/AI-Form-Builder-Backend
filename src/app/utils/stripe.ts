import Stripe from 'stripe';
import config from '../config';

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
});

export default stripe;
