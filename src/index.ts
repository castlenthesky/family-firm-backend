import config from "./config";
import express from "express";
import cors from "cors";
import router from "./routes";
import * as middlewares from "./middlewares";

// Create a new express application instance
const app: express.Application = express();

// Attach middlewares
app.use(express.json());
app.use(cors());
app.use(middlewares.requestTimeLogger);

// Use the router
app.use("/api", router);

// Start the Express server
app.listen(config.app.port, () => {
  console.log(
    `Server is running at http://${config.app.url}:${config.app.port}/api`,
  );
});
