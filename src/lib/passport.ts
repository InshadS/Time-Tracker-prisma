const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
import prisma from '../../src/prismaClient';
import passport from 'passport';

// Google Authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const user = await prisma.passportUser.findUnique({
          where: {
            id: profile.id,
          },
        });

        if (user) {
          done(null, user);
        } else {
          const newUser = await prisma.passportUser.create({
            data: {
              id: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value,
            },
          });
          done(null, newUser);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  )
);

// GitHub Authentication
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const user = await prisma.passportUser.findUnique({
          where: {
            id: profile.id,
          },
        });

        if (user) {
          done(null, user);
        } else {
          const newUser = await prisma.passportUser.create({
            data: {
              id: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value,
            },
          });
          done(null, newUser);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});
