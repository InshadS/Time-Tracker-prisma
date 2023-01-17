import express from 'express';
const app = express();
import cors from 'cors';
require('dotenv').config();
import passport from 'passport';
const PORT = process.env.PORT || 5000;
const taskRoute = require('./routes/tasks');
const authRoute = require('./routes/dbAuth');
var session = require('express-session');

app.use(express.json());

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,DELETE,PUT',
    credentials: true,
  })
);

// app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/task', taskRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
