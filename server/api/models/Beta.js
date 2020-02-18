const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

module.exports = model("beta", new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
}, { 
  versionKey: false 
}));