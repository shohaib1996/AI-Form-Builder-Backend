import { Types } from "mongoose";

export interface IResponse {
  _id?: string;
  formId: Types.ObjectId;
  answers: Record<string, any>;
  submittedAt?: Date;
}
