import { verifyAcessToken } from "./verify-token";
import { Express } from "express";

const middlewares = [verifyAcessToken];

export const applyMiddlewares = (app: Express ) => {
    middlewares.map((middleware) => app.use(middleware));
};
