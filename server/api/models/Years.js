const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const Term = require("./Terms");

module.exports = model("years", new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: "users", required: true },
	title: { type: String, required: true },
	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true }
    },
    terms: [Term],
	meta: {
		createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
}, {
    versionKey: false
}));