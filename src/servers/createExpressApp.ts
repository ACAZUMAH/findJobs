import helmet, { HelmetOptions } from "helmet";
import cors from "cors";
import limit from "express-rate-limit";
import express, { Application } from "express";

const helmetOtpions: HelmetOptions = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}

const rate =   limit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

export const createExpressApp = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json({ limit: '50mb' }));

  app.set("trust proxy", 1);

  app.use(rate);

  app.use(helmet(helmetOtpions));
  
  app.use(cors());
  
  return app;
};
