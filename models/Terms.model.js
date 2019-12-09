const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const Course = require("./Courses.model");

const TermSchema = new Schema({
	_id: Schema.Types.ObjectId,
	year: { type: Schema.Types.ObjectId, ref: "years", required: true },
	title: { type: String, required: true },
  	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true }
	},
	meta: {
		createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
});

// all children 
TermSchema.post("deleteOne", document => {
	const termId = document._id;

	Course.find({ term: termId }, {
		_id
	})
	.then(courses => {
		courses.map(course => {
			Course.findOneAndDelete({ _id: course._id })
		});
	})
	.catch(err => {
		
	});
});

module.exports = model("terms", TermSchema);
	
