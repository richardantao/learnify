const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const BugSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: "users" },
    where: { type: Array, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
    updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
    resolved: { type: Boolean, default: false }
});

module.exports = model("bugs", BugSchema);
