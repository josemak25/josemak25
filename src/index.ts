import mongoose, { Document } from "mongoose";
import http from "http";
import util from "util";

// config should be imported before importing any other file
import config from "./config/env";

import app from "./app";

import debug from "debug";

const server = new http.Server(app);

// connect to mongo db
const mongoUri = config.mongo.host;

//@ts-ignore
mongoose.connect(mongoUri, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set(
    "debug",
    (collectionName: String, method: String, query: String, doc: Document) => {
      debug("mongo-course-api:index")(
        `${collectionName}.${method}`,
        util.inspect(query, false, 20),
        doc
      );
    }
  );
}

// opens a port if the environment is not test
if (process.env.NODE_ENV !== "test") {
  // listen on port config.port
  server.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

export default server;
