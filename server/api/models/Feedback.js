const { model, Schema } = require("mongoose");

const moment = require("moment");

module.exports = model("feedback", new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
}, { 
    versionKey: false 
}));