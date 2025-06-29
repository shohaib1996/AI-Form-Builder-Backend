export type IRole = 'user' | 'admin';

export type IPlanType = 'normal' | 'premium';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  planType?: IPlanType;
  role?: IRole;
}
