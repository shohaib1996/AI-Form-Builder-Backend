import OpenAI from 'openai';
import config from '../../config';
import { Form } from './form.model';
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  // baseURL: "https://api.deepseek.com/v1"
});

export const generateFormFields = async (prompt: string): Promise<any[]> => {
  const aiPrompt = `Generate JSON field definitions for a form based on this description: "${prompt}". 
Each field should have name, label, type (text, email, number, select, etc.), and required (true/false) and don't generate any file fields rather than generate a text field where take the document link (e.g. "http://example.com/document.pdf") from user. For selecting options, provide an array of options.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // or "o4-mini" if you have access
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
  const form = await Form.create(formData);
  return form;
};

export const getAllForms = async (userId: string) => {
  const forms = await Form.find({ userId }).sort({ createdAt: -1 });
  return forms;
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
