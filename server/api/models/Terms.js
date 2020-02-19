require("dotenv").config();

const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const async = require("async");
const moment = require("moment");

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

TermSchema.post("updateOne", document => {
	const termId = document._id;
	const termStart = moment(document.date.start, "YYYY-MM-DD");
	const termEnd = moment(document.date.end, "YYYY-MM-DD");

	const getClasses = callback => {
		Class.find({ term: termId }, {
			_id: 1,
			"": 1
		})
		.then(classes => {
			return callback(null, classes);
		})
		.catch(err => {
			new Error(err);
		})
	};

	const compareClassStartDate = (dates, callback) => {
		if(dates === undefined) {
			return callback(null);	
		} else {
			const classes = dates.map(classe => {
				if(classe.date.start < termStart) {
					Class.updateOne({ _id: classe._id }, {
						$set: {
							date: {
								start: termStart,
								end: classe.date.end
							}
						}
					})
					.then(classe => {
						return classe;
					})
					.catch(err => {
						new Error(err);
					});
				} else {
					return classe;
				};
			});

			return callback(null, classes);
		};
	};

	const compareClassEndDate = (dates, callback) => {
		if(dates === null) {
			return callback(null);	
		} else {
			const classes = dates.map(classe => {
				if(classe.date.start > termEnd) {
					Class.updateOne({ _id: classe._id }, {
						$set: {
							date: {
								start: classe.date.start,
								end: termEnd
							}
						}
					})
					.then(classe => {
						return classe;
					})
					.catch(err => {
						new Error(err);
					});
				} else {
					return classe;
				};
			});

			return callback(null, classes);
		};
	};

	const getAssessments = callback => {
		Assessment.find({ term: termId }, {
			_id: 1,
			date: 1
		})
		.then(assessments => {
			return callback(null, assessments);
		})
		.catch(err => {
			new Error(err);
		});
	};

	compareAssessmentStartDate = (dates, callback) => {
		if(dates === undefined) {
			return callback(null);	
		} else {
			const assessments = dates.map(assessment => {
				if(assessment.date.start < termStart) {
					Assessment.updateOne({ _id: assessment._id }, {
						$set: {
							date: {
								start: termStart,
								end: assessment.date.end
							}
						}
					})
					.then(assessment => {
						return assessment;
					})
					.catch(err => {
						new Error(err);
					});
				} else {
					return assessment;
				};
			});

			return callback(null, assessments);
		};
	};

	const compareAssessmentEndDate = (dates, callback) => {
		if(dates === null) {
			return callback(null);	
		} else {
			const assessments = dates.map(assessment => {
				if(assessment.date.end > termEnd) {
					Assessment.updateOne({ _id: assessment._id }, {
						$set: {
							date: {
								start: assessment.date.start,
								end: termEnd
							}
						}
					})
					.then(assessment => {
						return assessment;
					})
					.catch(err => {
						new Error(err);
					});
				} else {
					return assessment;
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
			new Error(err);
		});
	};

	const compareTaskStartDate = (dates, callback) => {
		if(dates === undefined) {
			return callback(null);	
		} else {
			const tasks = dates.map(task => {
				if(task.deadline < termStart) {
					Task.updateOne({ _id: task._id }, {
						$set: {
							deadline: termStart
						}
					})
					.then(task => {
						return task;
					})
					.catch(err => {
						new Error(err);
					});
				} else {
					return task;
				};
			});

			return callback(null, tasks);
		};
	};

	compareTaskEndDate = (dates, callback) => {
		if(dates === null) {
			return callback(null);	
		} else {
			const tasks = dates.map(task => {
				if(task.deadline > termEnd) {
					Task.updateOne({ _id: task._id }, {
						$set: {
							deadline: termEnd
						}
					})
					.then(task => {
						return task;
					})
					.catch(err => {
						new Error(err);
					})
				} else {
					return task;
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
		]),
		assessments: async.waterfall([
			getAssessments,
			compareAssessmentStartDate,
			compareAssessmentEndDate
		]),
		tasks: async.waterfall([
			getTasks,
			compareTaskStartDate,
			compareTaskEndDate
		])
	}, (err, results) => {
		if(err) {
			new Error();
		} else {
			console.log(results);
		};
	});	
});

TermSchema.post("deleteMany" || "deleteOne", document => {
	const termId = document._id;

	Course.find({ term: termId }, {
		_id: 1
	})
	.then(courses => {
		courses.map(course => {
			if(course.term.length > 1) {
				Course.updateOne({ _id: course._id }, {
					$pull: {
						term: termId
					}
				});
			} else {	
				Course.findOneAndDelete({ _id: course._id });
			};

			console.log(`Course with id ${course._id} deleted`);
		});
	})
	.catch(err => {
		new Error(`...: ${err}`)
	});
});

module.exports = model("terms", TermSchema);
	
