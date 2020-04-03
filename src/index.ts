import http from "http";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import methodOverride from "method-override";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import config from "./config";
import error from "./config/errors";

// express application
const app = express();
const server = new http.Server(app);

// start db
import "./config/database";

// secure apps by setting various HTTP headers
app.use(
  helmet({ dnsPrefetchControl: false, frameguard: false, ieNoOpen: false })
);

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// parse body params and attach them to res.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(methodOverride());

// enable detailed API logging in dev env
if (config.env === "development") app.use(logger("dev"));

// all routes are marked as private routes within the app
app.use("/api/v1", routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// opens a port if the environment is not test
if (process.env.NODE_ENV !== "test") {
  server.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}
