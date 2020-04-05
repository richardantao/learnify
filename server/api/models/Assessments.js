const { model, Schema } = require("mongoose");

module.exports = model("assessments", new Schema({
	_id: Schema.Types.ObjectId,
	term: [ { type: Schema.Types.ObjectId, ref: "terms", required: true } ],
	course: { type: Schema.Types.ObjectId, ref: "courses", required: true },
	title: { type: String, required: true },
  	type: { type: String, required: true },
	date: {
		start: { type: Date, required: true },
		end: Date
	}, 
	location: String,
	grade: {
		weight: { type: Number, min: [0, ""], max: [100, ""] },
  		score: { type: Number, min: [0, ""], max: [100, ""] }
	},
	completed: { type: Boolean }
}, {
	versionKey: false
}));