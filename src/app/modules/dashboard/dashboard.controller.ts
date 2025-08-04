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

const getAdminDashboardStats = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const result = await DashboardService.getAdminDashboardStats();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Admin dashboard stats fetched successfully',
      data: result,
    });
  },
);

const getUserGrowthForAdmin = catchAsync(async (req, res) => {
  const result = await DashboardService.getUserGrowthForAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User growth data fetched successfully',
    data: result,
  });
});

const getPlanDistributionForAdmin = catchAsync(async (req, res) => {
  const result = await DashboardService.getPlanDistributionForAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Plan distribution data fetched successfully',
    data: result,
  });
});

const getFormCreationTrendForAdmin = catchAsync(async (req, res) => {
  const result = await DashboardService.getFormCreationTrendForAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Form creation trend data fetched successfully',
    data: result,
  });
});

const getResponseSubmissionTrendForAdmin = catchAsync(async (req, res) => {
  const result = await DashboardService.getResponseSubmissionTrendForAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Response submission trend data fetched successfully',
    data: result,
  });
});

export const DashboardController = {
  getFormsPerMonth,
  getResponsesOverTime,
  getResponsesByForm,
  getFormStatus,
  getAdminDashboardStats,
  getUserGrowthForAdmin,
  getPlanDistributionForAdmin,
  getFormCreationTrendForAdmin,
  getResponseSubmissionTrendForAdmin,
};
