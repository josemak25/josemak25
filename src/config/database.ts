import util from 'util';
import debug from 'debug';
import mongoose, { Document } from 'mongoose';

// config should be imported before importing any other file
import config from '.';

// connect to mongo db
mongoose.connect(config.mongoUri, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set(
    'debug',
    (collectionName: String, method: String, query: String, doc: Document) => {
      debug('mongo-course-api:index')(
        `${collectionName}.${method}`,
        util.inspect(query, false, 20),
        doc
      );
    }
  );
}
