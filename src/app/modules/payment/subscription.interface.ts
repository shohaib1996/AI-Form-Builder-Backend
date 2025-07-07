import { Types } from 'mongoose';

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  planName: string;
  status: string;
  stripeSubscriptionId: string;
  startedAt: Date;
  endsAt: Date | null;
}
