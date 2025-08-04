import { Types } from 'mongoose';
import { Form } from '../form/form.model';
import { ResponseModel } from '../response/response.model';
import { User } from '../users/user.model';

import {
  IFormStatus,
  IFormsPerMonth,
  IResponsesByForm,
  IResponsesOverTime,
} from './dashboard.interface';

const getFormsPerMonth = async (userId: string): Promise<IFormsPerMonth[]> => {
  const formsPerMonth = await Form.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: '$_id',
        count: 1,
        _id: 0,
      },
    },
    { $sort: { month: 1 } },
  ]);

  // Convert month number to month name
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return formsPerMonth.map((item) => ({
    month: months[item.month - 1],
    count: item.count,
  }));
};

const getResponsesOverTime = async (
  userId: string,
): Promise<IResponsesOverTime[]> => {
  const responsesOverTime = await ResponseModel.aggregate([
    {
      $lookup: {
        from: 'forms',
        localField: 'formId',
        foreignField: '_id',
        as: 'form',
      },
    },
    { $unwind: '$form' },
    { $match: { 'form.userId': new Types.ObjectId(userId) } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' } },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        date: '$_id',
        count: 1,
        _id: 0,
      },
    },
    { $sort: { date: 1 } },
  ]);

  return responsesOverTime;
};

const getResponsesByForm = async (
  userId: string,
): Promise<IResponsesByForm[]> => {
  const responsesByForm = await ResponseModel.aggregate([
    {
      $lookup: {
        from: 'forms',
        localField: 'formId',
        foreignField: '_id',
        as: 'form',
      },
    },
    { $unwind: '$form' },
    { $match: { 'form.userId': new Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$formId',
        formName: { $first: '$form.title' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        formName: 1,
        count: 1,
        _id: 0,
      },
    },
  ]);

  return responsesByForm;
};

const getFormStatus = async (userId: string): Promise<IFormStatus[]> => {
  const formStatus = await Form.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$isPublished',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        status: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  return formStatus;
};

// Admin services
const getAdminDashboardStats = async () => {
  const totalUsers = await User.countDocuments();
  const premiumUsers = await User.countDocuments({ planType: 'premium' });
  const totalForms = await Form.countDocuments();
  const totalResponses = await ResponseModel.countDocuments();

  return {
    totalUsers,
    premiumUsers,
    totalForms,
    totalResponses,
  };
};

const getUserGrowthForAdmin = async () => {
  const userGrowth = await User.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { date: '$_id', count: 1, _id: 0 } },
  ]);
  return userGrowth;
};

const getPlanDistributionForAdmin = async () => {
  const planDistribution = await User.aggregate([
    {
      $group: {
        _id: '$planType',
        count: { $sum: 1 },
      },
    },
    { $project: { plan: '$_id', count: 1, _id: 0 } },
  ]);
  return planDistribution;
};

const getFormCreationTrendForAdmin = async () => {
  const formCreationTrend = await Form.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { month: '$_id', count: 1, _id: 0 } },
  ]);
  return formCreationTrend;
};

const getResponseSubmissionTrendForAdmin = async () => {
  const responseSubmissionTrend = await ResponseModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { date: '$_id', count: 1, _id: 0 } },
  ]);
  return responseSubmissionTrend;
};

export const DashboardService = {
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