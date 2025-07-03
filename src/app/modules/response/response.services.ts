import { IResponse } from './response.interface';
import { ResponseModel } from './response.model';

export const createResponse = async (
  formId: string,
  answers: Record<string, any>,
): Promise<IResponse> => {
  const response = await ResponseModel.create({
    formId,
    answers,
    submittedAt: new Date(),
  });
  return response;
};

export const getResponses = async (formId: string): Promise<IResponse[]> => {
  return await ResponseModel.find({ formId }).sort({ submittedAt: -1 });
};

export const getSingleResponse = async (
  responseId: string,
): Promise<IResponse | null> => {
  return await ResponseModel.findById(responseId);
};
