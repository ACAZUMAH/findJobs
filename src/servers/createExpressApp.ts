import helmet, { HelmetOptions } from "helmet";
import cors from "cors";
import express from "express";
import seesions from 'express-session'
import passport from "passport";
import mongoStore from 'connect-mongodb-session'
import { logger } from "src/logger";

const helmetOtpions: HelmetOptions = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}

export const createExpressApp = () => {
  const app = express();

  const sessionStore = mongoStore(seesions)

  const store = new sessionStore({
    uri: String(process.env.MONGO_URL),
    collection: 'sessions'
  })

  store.on('error', (err) => logger.error(err))

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '50mb' }));

  app.use(seesions({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store,
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(helmet(helmetOtpions));
  
  app.use(cors());

  app.get('/', (_, res) => {
    res.send('FindJobs')
  })
  
  return app;
};
