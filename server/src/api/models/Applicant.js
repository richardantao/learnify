const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const ApplicantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    email: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true },
    help: String,
    knowledge: String,
    strategy: String,
    importance: { type: String, required: true },
    github: String,
    linkedin: String,
    other: { type: String, required: true },
    resume: { type: String, required: true },
    meta: {
		createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
});

module.exports = model("applicants", ApplicantSchema);
