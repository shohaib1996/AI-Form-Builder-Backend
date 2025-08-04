# 🧠 AI Form Builder

🚀 [Live Demo](https://form-ai-builder.vercel.app/) | 🛠 [Client Repo](https://github.com/shohaib1996/AI-Form-Builder-Client) | 🔧 [Backend Live](https://ai-form-builder-backend-kappa.vercel.app/)

AI Form Builder is an intelligent web-based platform that empowers users to effortlessly create smart, responsive, and customizable forms using AI. Whether you're building surveys, data collection tools, or contact forms, this tool speeds up your workflow with automation and clean UI.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript, MongoDB, Mongoose  
- **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript  
- **AI Services:** OpenAI, DeepSeek  
- **Authentication:** Google OAuth 2.0, JWT  
- **Payments:** Stripe

---

## ✨ Features

- ✅ **AI-Powered Form Creation**  
  Generate entire form structures using natural language prompts (powered by OpenAI and DeepSeek).

- 🧩 **Drag-and-Drop Form Editor**  
  Reorder, remove, and edit fields in real-time.

- 🗂 **Form Templates**  
  Start with pre-designed templates or let AI generate one.

- 🔒 **User Authentication**  
  Google OAuth and secure JWT-based sessions.

- 📊 **Form Analytics**  
  View responses and analyze submissions from the dashboard.

- 💳 **Stripe Integration**  
  Enable payments and pricing plans (premium features).

- 🌍 **Country Whitelist Support**  
  Only allow access from specific countries if needed.

- 📥 **Form Response Management**  
  Export responses in CSV, view stats, or connect to third-party tools.

---

## 🛠️ Environment Variables (Backend)

> ⚠️ **DO NOT commit `.env` file with credentials in production.**

---
.env file 

```
DB_URI=mongodb+srv://...
JWT_SECRET=...
OPENAI_API_KEY=...
DEEPSEEK_API_KEY=...
STRIPE_SECRET_KEY=...
SESSION_SECRET=...
BASE_URL=https://form-ai-builder.vercel.app
GOOGLE_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CALLBACK_URL=https://ai-form-builder-backend-kappa.vercel.app/api/auth/google/callback
ALLOWED_COUNTRIES=AC,AD,AE,...
```


---

## 📦 Setup & Development

### 🔧 Backend

```bash
git clone https://github.com/shohaib1996/AI-Form-Builder-Backend
cd AI-Form-Builder-Backend
npm install
npm run dev
```

---
# For run locally 

```
npm run dev

For build 
npm run build

```
