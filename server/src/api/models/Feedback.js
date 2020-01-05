const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const FeedbackSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: "users" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
},
{ 
  versionKey: false 
});

module.exports = model("feedback", FeedbackSchema);