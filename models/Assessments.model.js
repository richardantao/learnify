const Schema = require("mongoose").Schema;

const moment = require("moment");

const AssessmentSchema = new Schema({
	_id: Schema.Types.ObjectId,
	course: {type: Schema.Types.ObjectId, required: true, ref: "courses"},
	title: {type: String, required: true},
  	type: {type: String, required: true},
	date: {
		start: {type: Date, required: true},
		end: Date
	}, 
	location: String,
	grade: {
		weight: {type: Number, min: [0, ""], max: [100, ""]},
  		score: {type: Number, min: [0, ""], max: [100, ""]}
	},
	meta: {
		createdAt: {type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")},
		updatedAt: {type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")}
	}
});

module.exports = AssessmentSchema;