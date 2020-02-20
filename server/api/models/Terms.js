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
			new Error(err);
		})
	};

	const compareClassStartDate = (classes, callback) => {
		if(classes === undefined) {
			return callback(null);	
		} else {
			classes.map(({ _id, date: { start, end } }) => {
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
						return classe;
					})
					.catch(err => {
						new Error(err);
					});
				} else {
					return ({ _id, date: { start, end } });
				};
			});

			return callback(null, dates);
		};
	};

	const compareClassEndDate = (classes, callback) => {
		if(classes === null) {
			return callback(null);	
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
						return classe;
					})
					.catch(err => {
						new Error(err);
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
			new Error(err);
		});
	};

	compareAssessmentStartDate = (assessments, callback) => {
		if(assessments === undefined) {
			return callback(null);	
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
						return assessment;
					})
					.catch(err => {
						new Error(err);
					});
				} else {
					return ({ _id, date: { start, end } });
				};
			});

			return callback(null, assessments);
		};
	};

	const compareAssessmentEndDate = (assessments, callback) => {
		if(assessments === null) {
			return callback(null);	
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
						return assessment;
					})
					.catch(err => {
						new Error(err);
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
			new Error(err);
		});
	};

	const compareTaskStartDate = (tasks, callback) => {
		if(tasks === undefined) {
			return callback(null);	
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
						return task;
					})
					.catch(err => {
						new Error(err);
					});
				} else {
					return ({ _id, deadline });
				};
			});

			return callback(null, tasks);
		};
	};

	compareTaskEndDate = (tasks, callback) => {
		if(tasks === null) {
			return callback(null);	
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
						return task;
					})
					.catch(err => {
						new Error(err);
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
				new Error(err);
			} else {	
				return callback(null, "Classes have been checked and updated accordingly");
			};
		}),
		assessments: async.waterfall([
			getAssessments,
			compareAssessmentStartDate,
			compareAssessmentEndDate
		], (err, callback) => {
			if(err) {
				new Error(err);
			} else {	
				return callback(null, "Assessments have been checked and updated accordingly");
			};
		}),
		tasks: async.waterfall([
			getTasks,
			compareTaskStartDate,
			compareTaskEndDate
		], (err, callback) => {
			if(err) {
				new Error(err);
			} else {	
				return callback(null, "Tasks have been checked and updated accordingly");
			};
		})
	}, (err, results) => {
		if(err) {
			new Error();
		} else {
			console.log(results);
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
					return course;
				})
				.catch(err => {
					new Error(err);
				});
			} else {	
				Course.findOneAndDelete({ _id })
				.then(course => {
					return course;
				})
				.catch(err => {
					new Error(err);
				});
			};

			console.log(`Course with id ${course._id} deleted`);
		});

		return;
	})
	.catch(err => {
		new Error(`Error occured during Term cascade delete: ${err}`)
	});
});

module.exports = model("terms", TermSchema);