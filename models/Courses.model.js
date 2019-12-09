const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const async = require("async");
const moment = require("moment");

const Assessment = require("./Assessments.model");
const Task = require("./Tasks.model");

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

CourseSchema.post("deleteOne", document => {
	const courseId = document._id;

	async.series({
		assessments: callback => {
			Assessment.find({ course: courseId }, {
				_id: 1
			})
			.then(assessments => {
				assessments.map(assessment => {
					Assessment.findOneAndDelete({ _id: assessment._id});
				});
				callback(null, assessments);
			})
			.catch(err => {
				
			});
		},
		tasks: callback => {
			Task.find({ course: courseId }, {
				_id: 1
			})
			.then(tasks => {
				tasks.map(task => {
					Task.findOneAndDelete({ _id: task._id });
				});
				callback(null, tasks);
			})
			.catch(err => {
				
			});
		}
	}, (err, results) => {
		if(err) {

		} else {

		};
	});
});

module.exports = model("courses", CourseSchema);
	
