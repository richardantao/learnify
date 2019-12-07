const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const TaskSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, required: true },
	course: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, required: true },
	type: { type: String, required: true },
	deadline: { type: Date, required: true },
	completion: { type: Number, default: 0, min: [ 0, "Task completion cannot be less than 0" ], max: [ 100, "Task completion cannot be greater than 100%" ] },
	description: String,
	meta: {
		createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
});

module.exports = model("tasks", TaskSchema);
