// get the generic query class and sync with all data models
import Query from "./QueryHelper";

// get the all data model to be synced
import User from "../models/user.model";

// sync models with generic query class
const UserQuery = new Query(User);

// export all synced models for controllers to associate with
export default {
  UserQuery
};
