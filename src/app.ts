import express from 'express';
const app = express();
import cors from 'cors';
require('dotenv').config();
const PORT = process.env.PORT || 5000;
import taskRoute from './routes/tasks';
import authRoute from './routes/dbAuth';

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,DELETE,PUT',
    credentials: true,
  })
);

app.use('/auth', authRoute);
app.use('/task', taskRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
