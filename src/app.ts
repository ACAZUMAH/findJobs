require("express-async-errors");
import http from "http";
import { createExpressApp, createGraphQLServer } from "./servers";
import { schema } from "./graphQL";
import createError from 'http-errors';
import { connectDB } from "./common/helpers/connectDB";
import errorHandler from "./middlewares/error-Handler";
import { applyMiddlewares } from "./middlewares";
import { applyRouters } from "./routes";
import { logger } from "./logger/logger";

const PORT = process.env.PORT || 3500;

const startApp = async () => {
  const app = createExpressApp();
  const httpServer = http.createServer(app);

  applyMiddlewares(app);

  applyRouters(app);

  await createGraphQLServer({ app, schema, httpServer });

  await connectDB(String(process.env.MONGO_URL));

  app.use(errorHandler);

  // app.all("*", (_, __, next) => {
  //   next(createError(404, 'unable to retrive requested resources'))
  // });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  logger.info(`🚀 Server ready at http://localhost:${PORT}/`);
  logger.info(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
};

export default startApp;
