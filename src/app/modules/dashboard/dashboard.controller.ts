import { Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { DashboardService } from './dashboard.services';
import sendResponse from '../../utils/sendResponse';
import { AuthRequest } from '../../middlewares/auth';

const getFormsPerMonth = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user || !req.user._id) {
    res
      .status(401)
      .json({ success: false, message: 'Unauthorized: User not found' });
    return;
  }
  const userId = req.user._id;
  const result = await DashboardService.getFormsPerMonth(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Forms per month fetched successfully',
    data: result,
  });
});

const getResponsesOverTime = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user || !req.user._id) {
      res
        .status(401)
        .json({ success: false, message: 'Unauthorized: User not found' });
      return;
    }
    const userId = req.user._id;
    const result = await DashboardService.getResponsesOverTime(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Responses over time fetched successfully',
      data: result,
    });
  },
);

const getResponsesByForm = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user || !req.user._id) {
      res
        .status(401)
        .json({ success: false, message: 'Unauthorized: User not found' });
      return;
    }
    const userId = req.user._id;
    const result = await DashboardService.getResponsesByForm(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Responses by form fetched successfully',
      data: result,
    });
  },
);

const getFormStatus = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user || !req.user._id) {
    res
      .status(401)
      .json({ success: false, message: 'Unauthorized: User not found' });
    return;
  }
  const userId = req.user._id;
  const result = await DashboardService.getFormStatus(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Form status fetched successfully',
    data: result,
  });
});

export const DashboardController = {
  getFormsPerMonth,
  getResponsesOverTime,
  getResponsesByForm,
  getFormStatus,
};
