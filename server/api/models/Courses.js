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
	theme: { type: String, default: "#00A6FF" }
}, {
	versionKey: false
});

CourseSchema.post("findOneAndUpdate", ({ _id, term }) => {
	const course = _id;
	
	async.parallel({
		classes: callback => {
			Class.updateMany({ course }, {
				$set: {
					term
				}
			})
			.then(classes => {
				return callback(
					null,
					`${classes.nModified} termId updates after the update of course-${course}`
				);
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
			.then(assessments => {
				return callback(
					null,
					`${assessments.nModified} termId updates after the update of course-${course}`
				);
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
			.then(tasks => {
				return callback(
					null,
					`${tasks.nModified} termId updates after the update of course-${course}`
				);
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

CourseSchema.post("findOneAndDelete", ({ _id }) => {
	const course = _id;

	async.parallel({
		classes: callback => {
			Class.deleteMany({ course })
			.then(classes => {
				return callback(
					null,
					`${classes.deletedCount} have been cascade deleted from the termination of course-${course}`
				);
			})
			.catch(err => {
				new Error(err);
			});
		},
		assessments: callback => {
			Assessment.deleteMany({ course })
			.then(assessments => {
				return callback(
					null, 
					`${assessments.deletedCount} have been cascade deleted from the termination of course-${course}`
				);
			})
			.catch(err => {
				new Error(err);
			});
		},
		tasks: callback => {
			Task.deleteMany ({ course })
			.then(tasks => {
				return callback(
					null,
					`${tasks.deletedCount} have been cascade deleted from the termination of course-${course}`
				);
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

module.exports = model("courses", CourseSchema);