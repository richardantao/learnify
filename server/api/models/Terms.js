require("dotenv").config();

// database
const { model, Schema }  = require("mongoose");

// helpers
const async = require("async");
const moment = require("moment");

// logger
const logger = require("../../config/logger");

// models
const Course = require("./Courses");
const Class = require("./Classes");
const Assessment = require("./Assessments");
const Task = require("./Tasks");

const TermSchema = new Schema({
	_id: Schema.Types.ObjectId,
	year: { type: Schema.Types.ObjectId, ref: "years", required: true },
	title: { type: String, required: true },
  	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true }
	}
}, {
	versionKey: false
});

TermSchema.post("updateOne", ({ _id, date: { start, end } }) => {
	const term = _id;
	const termStart = moment(start, "YYYY-MM-DD");
	const termEnd = moment(end, "YYYY-MM-DD");

	const getClasses = callback => {
		Class.find({ term }, {
			_id: 1,
			"": 1
		})
		.then(classes => {
			return callback(null, classes);
		})
		.catch(err => {
			return logger.error(`Error occurred finding Classes during Term-${term} post-hook update: ${err}`);
		});
	};

	const compareClassStartDate = (classes, callback) => {
		if(!classes) {
			return callback(null, nulls);	
		} else {
			const dates = classes.map(({ _id, date: { start, end } }) => {
				if(start < termStart) {
					Class.findOneAndUpdate({ _id }, {
						$set: {
							date: {
								start: termStart,
								end
							}
						}
					}, {
						returnNewDocument: true
					})
					.then(classe => {
						return logger.info(`Start date of Class-${classe._id} has been updated by Term-${term} post-hook update`); 
					})
					.catch(err => {
						return logger.error(`Error occurred updating Class start dates during post-hook update of Term-${term}: ${err}`);
					});
				} else {
					return ({ _id, date: { start, end } });
				};
			});

			return callback(null, dates);
		};
	};

	const compareClassEndDate = (classes, callback) => {
		if(!classes) {
			return callback(null, null);	
		} else {
			classes.map(({ _id, date: { start, end } }) => {
				if(end > termEnd) {
					Class.findOneAndUpdate({ _id }, {
						$set: {
							date: {
								start,
								end: termEnd
							}
						}
					}, {
						returnNewDocument: true
					})
					.then(classe => {
						return logger.info(`End date of Class-${classe._id} has been updated following a Term-${term} post-hook update`);
					})
					.catch(err => {
						return logger.error(`Error occurred during updating Classes following a Term-${term} post-hook update: ${err}`);
					});
				} else {
					return ({ _id, date: { start, end } });
				};
			});

			return callback(null, classes);
		};
	};

	const getAssessments = callback => {
		Assessment.find({ term }, {
			_id: 1,
			date: 1
		})
		.then(assessments => {
			return callback(null, assessments);
		})
		.catch(err => {
			return logger.error(`Error fetching Assessments following a Term-${term} post-hook update: ${err}`);
		});
	};

	const compareAssessmentStartDate = (assessments, callback) => {
		if(!assessments) {
			return callback(null, null);	
		} else {
			assessments.map(({ _id, date: { start, end} }) => {
				if(start < termStart) {
					Assessment.findOneAndUpdate({ _id }, {
						$set: {
							date: {
								start: termStart,
								end
							}
						}
					}, {
						returnNewDocument: true
					})
					.then(assessment => {
						return logger.info(`Start date of Assessment-${assessment._id} has been updated following a Term-${term} post-hook update`);
					})
					.catch(err => {
						return logger.error(`Error occurred updating Assessments following a Term-${term} post-hook update: ${err}`);
					});
				} else {
					return ({ _id, date: { start, end } });
				};
			});

			return callback(null, assessments);
		};
	};

	const compareAssessmentEndDate = (assessments, callback) => {
		if(!assessments) {
			return callback(null, null);	
		} else {
			assessments.map(({ _id, date: { start, end } }) => {
				if(end > termEnd) {
					Assessment.findOneAndUpdate({ _id }, {
						$set: {
							date: {
								start,
								end: termEnd
							}
						}
					}, {
						returnNewDocument: true
					})
					.then(assessment => {
						return logger.info(`End date of Assessment-${assessment._id} has been updated from Term-${term} post-hook update`);
					})
					.catch(err => {
						return logger.error(`Error occurred updating Assessments following a Term-${term} post-hook update: ${err}`);
					});
				} else {
					return ({ _id, date: { start, end } });
				};
			});

			return callback(null, assessments);
		};
	};

	const getTasks = callback => {
		Task.find({ term: termId }, {
			_id: 1,
			deadline: 1
		})
		.then(tasks => {
			return callback(null, tasks);
		})
		.catch(err => {
			return logger.error(`Error occurred fetching tasks following a Term-${term} post-hook update:${err}`);
		});
	};

	const compareTaskStartDate = (tasks, callback) => {
		if(!tasks) {
			return callback(null, null);	
		} else {
			tasks.map(({ _id, deadline }) => {
				if(deadline < termStart) {
					Task.findOneAndUpdate({ _id }, {
						$set: {
							deadline: termStart
						}
					}, {
						returnNewDocument: true
					})
					.then(task => {
						return logger.info(`Deadline of Task-${task._id} has been set to ${task.deadline} following a Term-${term} post-hook update`);
					})
					.catch(err => {
						return logger.error(`Error occurred updating a Task following a Term-${term} post-hook update: ${err}`);
					});
				} else {
					return ({ _id, deadline });
				};
			});

			return callback(null, tasks);
		};
	};

	const compareTaskEndDate = (tasks, callback) => {
		if(!tasks) {
			return callback(null, null);	
		} else {
			tasks.map(({ _id, deadline }) => {
				if(deadline > termEnd) {
					Task.findOneAndUpdate({ _id }, {
						$set: {
							deadline: termEnd
						}
					}, {
						returnNewDocument: true
					})
					.then(task => {
						return logger.info(`Deadline of Task-${task._id} has been set to ${task.deadline} following a Term-${term} post-hook update`);
					})
					.catch(err => {
						return logger.error(`Error occurred updating Tasks during Term-${term} post-hook update: ${err}`);
					})
				} else {
					return ({ _id, deadline });
				};
			});

			return callback(null, tasks);
		};
	};

	async.parallel({
		classes: async.waterfall([
			getClasses,
			compareClassStartDate,
			compareClassEndDate
		], (err, callback) => {
			if(err) {
				return logger.error(`Error occurred handling Classes during Term-${term} post-hook update: ${err}`);
			} else {	
				return callback(null, `Classes have been checked and updated for Term-${term} post-hook update`);
			};
		}),
		assessments: async.waterfall([
			getAssessments,
			compareAssessmentStartDate,
			compareAssessmentEndDate
		], (err, callback) => {
			if(err) {
				return logger.error(`Error occurred handling Assessments during Term-${term} post-hook update: ${err}`);
			} else {	
				return callback(null, `Assessments have been checked and updated for Term-${term} post-hook update`);
			};
		}),
		tasks: async.waterfall([
			getTasks,
			compareTaskStartDate,
			compareTaskEndDate
		], (err, callback) => {
			if(err) {
				return logger.error(`Error occurred handling Tasks during Term-${term} post-hook update: ${err}`);
			} else {	
				return callback(null, `Tasks have been checked and updated after Term-${term} post-hook update`);
			};
		})
	}, (err, results) => {
		if(err) {
			return logger.error(`Error occured when during Term-${term} post-hook update: ${err}`);
		} else {
			return logger.info(results);
		};
	});	
});

TermSchema.post("findOneAndDelete", ({ _id }) => {
	const term = _id;

	Course.find({ term }, {
		_id: 1
	})
	.then(courses => {
		courses.map(({ _id, term }) => {
			if(term.length > 1) {
				Course.findOneAndUpdate({ _id }, {
					$pull: {
						term
					}
				}, {
					returnNewDocument: true
				})
				.then(course => {
					return logger.info(`Course-${course._id} has been updated from Term-${term} post-hook delete`);
				})
				.catch(err => {
					return logger.error(`Error occurred updating Courses during Term-${term} post-hook delete: ${err}`);
				});
			} else {	
				Course.findOneAndDelete({ _id })
				.then(course => {
					return logger.info(`Course-${course._id} deleted from Term-${term} post-hook delete`);
				})
				.catch(err => {
					return logger.error(`Error occurred deleting Courses during Term-${term} post-hook delete: ${err}`);
				});
			};
		});
	})
	.catch(err => {
		return logger.error(`Error occurred during Term-${term} post-hook delete: ${err}`)
	});
});

module.exports = model("terms", TermSchema);