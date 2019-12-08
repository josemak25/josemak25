import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import methodOverride from "method-override";
import cors from "cors";
import expressWinston from "express-winston";
import helmet from "helmet";
import winstonInstance from "./config/winston";
import error from "./config/errors";
const config = require("./config/env");
import routes from "./routes/index";

const app = express();
// secure apps by setting various HTTP headers
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// parse body params and attach them to res.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(methodOverride());

// enable detailed API logging in dev env
if (config.env === "development") {
  app.use(logger("dev"));
  expressWinston.responseWhitelist.push("body");
  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg:
        "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
      colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  );
}

// all routes are marked as private routes within the app
app.use("/api/v1", routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

if (config.env !== "test") {
  app.use(
    expressWinston.errorLogger({
      winstonInstance
    })
  );
}

export default app;
