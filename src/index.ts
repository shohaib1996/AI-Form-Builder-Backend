import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello AI Form Builder!');
});

mongoose
  .connect(
    'mongodb+srv://AI-FORM_BUILDER_BACKEND:XMbQYcwH0pXWgZ8q@cluster0.lapzl7c.mongodb.net/aiFormBuilder?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })

  .catch((err) => console.error(err));
