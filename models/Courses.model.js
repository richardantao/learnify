const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const CourseSchema = new Schema({
	_id: Schema.Types.ObjectId,
	year: { type: Schema.Types.ObjectId, ref: "years", required: true },
	term: [ { type: Schema.Types.ObjectId, ref: "terms", required: true } ],
	code: { type: String, required: true },
	title: { type: String, required: true },
	credit: { type: Number, required: true },
	instructor: String,
	theme: { type: String, default: "#00A6FF" }, 
	meta: {
		createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
});

module.exports = model("courses", CourseSchema);
	
