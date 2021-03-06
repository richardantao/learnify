const { model, Schema } = require("mongoose");

const moment = require("moment");

module.exports = model("groups", new Schema({
    organization: { type: Schema.Types.ObjectId, required: true, ref: "organizations" },
    title: { type: String, required: true },
    meta: {
        createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
    }
}, {
    versionKey: false
}));
