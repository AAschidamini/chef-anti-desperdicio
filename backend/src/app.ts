import cors from "cors";
import express, { type Express } from "express";
import { apiRouter } from "./presentation/routes";
import { errorHandler } from "./presentation/middlewares/error-handler";
import { notFoundHandler } from "./presentation/middlewares/not-found";
import { env } from "./infrastructure/config/env";

export function createApp(): Express {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
