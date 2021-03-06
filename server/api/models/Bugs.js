const { model, Schema } = require("mongoose");

const moment = require("moment");

module.exports = model("bugs", new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    where: [ { type: String, required: true } ],
    type: { type: String, required: true },
    message: { type: String, required: true },
    meta: {
        createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
        updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
    },
    resolved: { type: Boolean, default: false }
}));
