const { model, Schema } = require("mongoose");

module.exports = model("tasks", new Schema({
	term: [ { type: Schema.Types.ObjectId, ref: "terms", required: true } ], // deprecated
	course: { type: Schema.Types.ObjectId, ref: "courses", required: true }, // deprecated
	assessment: { type: Schema.Types.ObjectId, ref: "assessments", required: true },
	title: { type: String, required: true },
	type: { type: String, required: true },
	deadline: { type: Date, required: true },
	completed: Boolean,
	description: String
}, {
	versionKey: false
}));
