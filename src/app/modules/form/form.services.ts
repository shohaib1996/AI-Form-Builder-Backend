import OpenAI from 'openai';
import config from '../../config';
import { Form } from './form.model';
import { User } from '../users/user.model';

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

export const generateFormFields = async (prompt: string): Promise<any[]> => {
  const aiPrompt = `Generate JSON field definitions for a form based on this description: "${prompt}". 
Each field should have name, label, type (text, email, number, select, etc.), and required (true/false) and don't generate any file fields rather than generate a text field where take the document link (e.g. "http://example.com/document.pdf") from user. For selecting options, provide an array of options.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: aiPrompt,
      },
    ],
  });

  const content = response.choices[0].message.content;
  let fields;
  try {
    fields = JSON.parse(content!);
  } catch (error) {
    console.log(error);
    throw new Error('AI response could not be parsed as JSON');
  }

  return fields;
};

export const createForm = async (formData: any) => {
  const user = await User.findById(formData.userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.formLimit && user.formLimit <= 0) {
    throw new Error('Form limit reached. Please upgrade your plan.');
  }

  const form = await Form.create(formData);

  if (user.formLimit) {
    user.formLimit -= 1;
  }
  await user.save();

  return form;
};

export const getAllForms = async (
  userId: string,
  options: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  },
) => {
  const { page = 1, limit = 10, searchTerm } = options;
  const skip = (page - 1) * limit;

  const query: any = { userId };

  if (searchTerm) {
    query.$or = [{ title: { $regex: searchTerm, $options: 'i' } }];
    if (searchTerm.match(/^[0-9a-fA-F]{24}$/)) {
      query.$or.push({ _id: searchTerm });
    }
  }

  const forms = await Form.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Form.countDocuments(query);

  return {
    data: forms,
    meta: {
      page,
      limit,
      total,
    },
  };
};

export const getFormById = async (id: string) => {
  const form = await Form.findById(id);
  if (!form) {
    throw new Error('Form not found');
  }
  return form;
};

export const updateForm = async (id: string, formData: any) => {
  const updatedForm = await Form.findByIdAndUpdate(id, formData, { new: true });
  if (!updatedForm) {
    throw new Error('Form not found');
  }
  return updatedForm;
};

export const deleteForm = async (id: string) => {
  const deletedForm = await Form.findByIdAndDelete(id);
  if (!deletedForm) {
    throw new Error('Form not found');
  }
  return deletedForm;
};

export const togglePublishForm = async (id: string) => {
  const form = await Form.findById(id);
  if (!form) {
    throw new Error('Form not found');
  }
  form.isPublished = !form.isPublished;
  const updatedForm = await form.save();
  return updatedForm;
};

export const getAllFormsForAdmin = async (options: {
  page?: number;
  limit?: number;
  searchTerm?: string;
}) => {
  const { page = 1, limit = 10, searchTerm } = options;
  const skip = (page - 1) * limit;

  const query: any = {};

  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { 'user.name': { $regex: searchTerm, $options: 'i' } },
      { 'user.email': { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const forms = await Form.find(query)
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Form.countDocuments(query);

  return {
    data: forms,
    meta: {
      page,
      limit,
      total,
    },
  };
};
