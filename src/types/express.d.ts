// src/types/express.d.ts
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    // Add other properties as needed (e.g., email, name)
  };
}