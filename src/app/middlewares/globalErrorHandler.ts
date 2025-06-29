import { ErrorRequestHandler } from 'express';
import { ApiError } from '../errors/ApiError';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err?.message || err,
  });
};
