import OpenAI from "openai";
import config from "../../config";
import { Form } from "./form.model";
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  // baseURL: "https://api.deepseek.com/v1"
});

export const generateFormFields = async (prompt: string): Promise<any[]> => {
  const aiPrompt = `Generate JSON field definitions for a form based on this description: "${prompt}". 
Each field should have name, label, type (text, email, number, select, etc.), and required (true/false).`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // or "o4-mini" if you have access
    messages: [
      {
        role: "user",
        content: aiPrompt,
      },
    ],
  });

  const content = response.choices[0].message.content;
  let fields;
  try {
    fields = JSON.parse(content!);
  } catch (error) {
    throw new Error("AI response could not be parsed as JSON");
  }

  return fields;
};

export const createForm = async (formData: any) => {
  const form = await Form.create(formData);
  return form;
};
