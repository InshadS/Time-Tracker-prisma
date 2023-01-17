const router = require('express').Router({ mergeParams: true });
import passport from 'passport';
const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_LOGIN_URL = process.env.CLIENT_LOGIN_URL;
import prisma from '../../src/prismaClient';

router.get('/login/success', (req: any, res: any) => {
  res.status(200).json({
    success: true,
    message: 'successfull',
    user: req.user,
  });
});

router.get('/login/failed', (req: any, res: any) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get('/logout', (req: any, res: any) => {
  req.logout();
  res.redirect(CLIENT_LOGIN_URL);
});

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

// Get User
router.get('/:id', async (req: any, res: any) => {
  try {
    const getUser = await prisma.passportUser.findFirst({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send(getUser);
  } catch (error) {
    console.error(error);
  }
});

router.post('/add-user', async (req: any, res: any) => {
  try {
    const { id, name, avatar } = req.body;
    const userId = req.params.id;

    const addTask = await prisma.passportUser.create({
      data: {
        name: name,
        avatar: avatar,
        id: id,
      },
    });

    console.log(addTask);

    res.status(200).send(addTask);
  } catch (error: any) {
    console.error(error.message);
  }
});

module.exports = router;
