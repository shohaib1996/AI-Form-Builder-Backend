import { Schema, model } from 'mongoose';
import { ISubscription } from './subscription.interface';

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'expired', 'trialing'],
      default: 'active',
    },
    stripeSubscriptionId: {
      type: String,
      required: true,
    },
    startedAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const Subscription = model<ISubscription>(
  'Subscription',
  subscriptionSchema,
);
