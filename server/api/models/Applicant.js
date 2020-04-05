const { model, Schema } = require("mongoose");

const moment = require("moment");

module.exports = model("applicants", new Schema({
  _id: Schema.Types.ObjectId,
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  strategy: { type: String, required: true},
  help: { type: String, required: true},
  importance: { type: String, required: true },
  resume: { type: Buffer, required: true },
  portfolio: String,
  linkedin: String,
  other: String,
  date: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
}, { 
  versionKey: false 
}));