import fs from 'fs';
import { Model, Document } from 'mongoose';
import Query from './query';
import QueryInterface from './types';

// get working models from working directory
const directoryPath = `${process.cwd()}/dist/models`;

const AllModels = fs.readdirSync(directoryPath);

if (!AllModels) throw new Error(`unable to read and sync all models`);

const builderObject: QueryInterface = AllModels.reduce(
  (accumulator: any, file) => {
    // skip any typescript compiled map file
    if (file.includes('.map')) return accumulator;

    // get every model from the model folder
    const Model: Model<Document> = require(`../models/${file}`).default;

    // get model name
    const [fileName] = file.split('.');

    // attach query word to every model name
    const queryBuilderName = `${fileName
      .charAt(0)
      .toUpperCase()}${fileName.slice(1)}Query`;

    // sync model to general query methods
    const ModelQuery = new Query(Model);

    // attach synced model to accumulator
    accumulator[queryBuilderName] = ModelQuery;
    return accumulator;
  },
  {}
);

// export synched model for use on controller
export default builderObject;
