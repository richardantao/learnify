const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

module.exports = model("groups", new Schema({
    _id: Schema.Types.ObjectId,
    organization: { type: Schema.Types.ObjectId, required: true, ref: "organizations" },
    title: { type: String, required: true },
    meta: {
        createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
    }
}, {
    versionKey: false
}));
