require("dotenv").config();

const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const async = require("async");
const moment = require("moment");

const Class = require("./Classes");
const Assessment = require("./Assessments");
const Task = require("./Tasks");

const CourseSchema = new Schema({
	_id: Schema.Types.ObjectId,
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
}, {
	versionKey: false
});

CourseSchema.post("updateOne", document => {
	const course = document._id;
	const term = document.term;
	
	async.parallel({
		classes: callback => {
			Class.updateMany({ course }, {
				$set: {
					term
				}
			})
			.then(() => {
				return callback(null, { classes: true });
			})
			.catch(err => {
				new Error(err);
			});
		},
		assessments: callback => {
			Assessment.updateMany({ course }, {
				$set: {
					term
				}
			})
			.then(() => {
				return callback(null, { assessments: true });
			})
			.catch(err => {
				new Error(err);
			});
		},
		tasks: callback => {
			Task.updateMany({ course }, {
				$set: {
					term
				}
			})
			.then(() => {
				return callback(null, { tasks: true });
			})
			.catch(err => {
				new Error(err);
			});
		}
	}, (err, results) => {
		if(err) {
			new Error(err);
		} else {
			console.log(results);
		};
	});	
});

CourseSchema.post("deleteOne", document => {
	const courseId = document._id;

	async.parallel({
		assessments: callback => {
			Assessment.find({ course: courseId }, {
				_id: 1
			})
			.then(assessments => {
				assessments.map(assessment => {
					Assessment.findOneAndDelete({ _id: assessment._id})
					.then(() => {
						return;
					})
					.catch(err => {
						new Error(err);
					});
				});
				return callback(null, { assessments: true });
			})
		},
		tasks: callback => {
			Task.find({ course: courseId }, {
				_id: 1
			})
			.then(tasks => {
				tasks.map(task => {
					Task.findOneAndDelete({ _id: task._id })
					.then(() => {
						return;
					})
					.catch(err => {
						new Error(err);
					});
				});
				
				return callback(null, { tasks: true });
			})
		},
		classes: callback => {
			Class.find({ course: courseId }, {
				_id: 1
			})
			.then(classes => {
				classes.map(classe => {
					Class.findOneAndDelete({ _id: classe._id })
					.then(() => {
						return;
					})
					.catch(err => {
						new Error(err);
					});
				});
				return callback(null, { classes: true });
			});
		}
	}, (err, results) => {
		if(err) {
			new Error(err);
		} else {
			console.log(`The following documents have been deleted: ${results}`);
		};
	});
});

module.exports = model("courses", CourseSchema);