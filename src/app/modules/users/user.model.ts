import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import { defaultRole, userPlanTypes } from "./user.constant";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: "" },
    planType: { type: String, enum: ["normal", "premium"], default: userPlanTypes.NORMAL },
    role: { type: String, enum: ["user", "admin"], default: defaultRole },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;
  next();
});

export const User = model<IUser>("User", userSchema);
