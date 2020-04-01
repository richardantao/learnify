const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

module.exports = model("tasks", new Schema({
	_id: Schema.Types.ObjectId,
	term: [ { type: Schema.Types.ObjectId, ref: "terms", required: true } ],
	course: { type: Schema.Types.ObjectId, ref: "courses", required: true },
	title: { type: String, required: true },
	type: { type: String, required: true },
	deadline: { type: Date, required: true },
	completed: Boolean,
	description: String
}, {
	versionKey: false
}));
