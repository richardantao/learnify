const Schema = require("mongoose").Schema;

const moment = require("moment");

const CourseSchema = new Schema({
	_id: Schema.Types.ObjectId,
	term: {type: Schema.Types.ObjectId, required: true, ref: "terms"},
	code: {type: String, required: true},
	title: {type: String, required: true},
	credit: {type: Number, required: true},
	instructor: String,
	theme: {type: String, default: "#00A6FF"}, 
	meta: {
		createdAt: {type: Date, default: () => moment().startOf("minute").format("MMMM Do YYYY, HH:mm a")},
		updatedAt: {type: Date, default: () => moment().startOf("minute").format("MMMM Do YYYY, HH:mm a")}
	}
});

module.exports = CourseSchema;
	
