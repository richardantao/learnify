require("dotenv").config();

// database
const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

// helpers
const async = require("async");
const moment = require("moment");

// logger
const logger = require("../../config/logger");

// models
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
				return logger.error(`Error occurred updating Classes during Course-${course} post-hook update: ${err}`);
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
				return logger.error(`Error occurred updating Assessments following Course-${course} post-hook update: ${err}`);
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
				return logger.error(`Error occurred deleting Tasks following Course-${course} post-hook delete: ${err}`);
			});
		}
	}, (err, results) => {
		if(err) {
			return logger.error(err);
		} else {
			return logger.info(results);
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
					`${classes.deletedCount} have been cascade deleted from the post-hook delete of Course-${course}`
				);
			})
			.catch(err => {
				return logger.error(`Error occurred deleting Classes following Course-${course} post-hook delete: ${err}`);
			});
		},
		assessments: callback => {
			Assessment.deleteMany({ course })
			.then(assessments => {
				return callback(
					null, 
					`${assessments.deletedCount} have been cascade deleted from the post-hook delete of Course-${course}`
				);
			})
			.catch(err => {
				return logger.error(`Error occurred deleting Assessments following Course-${course} post-hook delete: ${err}`);
			});
		},
		tasks: callback => {
			Task.deleteMany ({ course })
			.then(tasks => {
				return callback(
					null,
					`${tasks.deletedCount} have been cascade deleted from the post-hook delete of Course-${course}`
				);
			})
			.catch(err => {
				return logger.error(err);
			});
		}
	}, (err, results) => {
		if(err) {
			return logger.error(`Error occurred : ${err}`);
		} else {
			return logger.info(results);
		};
	});
});

module.exports = model("courses", CourseSchema);