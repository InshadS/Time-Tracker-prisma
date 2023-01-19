const router = require('express').Router({ mergeParams: true });
const utils = require('../lib/utils');
import { use } from 'passport';
import prisma from '../../src/prismaClient';

//Register
router.post('/register', async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const userRegister = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await utils.hashPassword(password),
      },
    });
    res.status(201).send(userRegister);
  } catch (error: any) {
    console.error(error.message);
  }
});

//Login
router.post('/login', async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const userLogin = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userLogin) {
      const validPassword = await utils.comparePassword(
        password,
        userLogin.password
      );
      if (validPassword) {
        res.status(200).json('Valid email and password');
      } else {
        res.status(400).json('Wrong password!');
      }
    } else {
      res.status(404).json('User not found!');
    }
  } catch (error: any) {
    console.error(error.message);
  }
});

router.get('/users', async (req: any, res: any) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).send(users);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
