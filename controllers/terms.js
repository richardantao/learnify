const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// model
const Term = require("../models/Terms");
const Year = require("../models/Years");

const redis = require("../config/cache");
	
exports.create = (req, res) => {
	const { _id } = req.user;
	const { year, title, start, end } = req.body;

	const redisTermsKey = `${_id}:terms`;

	const saveToDb = callback => {
		Term.create({
			_id: ObjectId(),
			user: ObjectId("5deb33a40039c4286179c4f1"),
			year: ObjectId(year),
			title,
			date: {
				start,
				end
			}
		})
		.then(prePopulatedTerm => {
			return callback(null, prePopulatedTerm);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message
			});
		});
	};

	const populatePreCache = (prePopulatedTerm, callback) => {
		Term.find({ _id: prePopulatedTerm._id })
		.populate("year", [ "title" ])
		.limit(1)
		.then(populatedTerm => {
			callback(null, populatedTerm[0]);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message
			});
		});
	};

	const cacheResults = (populatedTerm, callback) => {
		redis.del(redisTermsKey);

		const term = {
			_id: populatedTerm._id,
			year: {
				_id: populatedTerm.year._id,
				title: populatedTerm.year._id
			},
			title: populatedTerm.title,
			date: {
				start: populatedTerm.date.start,
				end: populatedTerm.date.end
			},
			meta: {
				createdAt: populatedTerm.meta.createdAt,
				updatedAt: populatedTerm.meta.updatedAt,
			}
		};

		redis.setex(JSON.stringify(term._id), 3600, JSON.stringify(term));
		
		delete term.meta;
	
		return callback(null, { 
			message: "New term created",
			term
		});
	};

	async.waterfall([
		saveToDb,
		populatePreCache,
		cacheResults
	], (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message
			});
		} else {
			return res.status(201).json(results);
		};
	});
};

exports.read = (req, res) => {
	const { _id } = req.user;
	const { yearId } = req.params;

	const redisKey = `${_id}:terms`;

	const checkCache = callback => {
		redis.get(redisKey, (err, cacheResults) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				});
			} else if (cacheResults) {
				return callback(null, cacheResults);
			} else {
				return callback(null);
			};	
		});
	};	

	const queryDb = (cacheResults, callback) => {
		if(cacheResults) {
			redis.setex(redisKey, 3600, cacheResults);

			JSON.parse(cacheResults);

			const terms = cacheResults.map(term => {
				delete term.meta;
			});

			return callback(null, terms);
		} else {
			Term.find({ year: yearId }, {
				_id: 1,
				year: 1,
				title: 1,
				date: 1,
				meta: 1
			})
			.populate("year", [ "title" ])
			.sort({ "date.start": -1})
			.then(payload => {
				if(payload.length === 0) {
					return res.status(404).json({
						message: "No terms were found"
					});
				} else {
					redis.setex(redisKey, 3600, JSON.stringify(payload));

					const terms = payload.map(term => {
						delete term.meta;
					});

					return callback(null, terms);
				};
			})
			.catch(err => {
				return res.status(500).json({
					message: err.message
				});
			});
		};
	};

	async.waterfall([
		checkCache,
		queryDb
	], (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message
			});
		} else {
			return res.status(200).json(results);
		};
	});
};

exports.edit = (req, res) => {
	const { termId } = req.params;

	const checkCache = callback => {
		redis.get(JSON.stringify(termId), (err, cacheResults) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				});
			} else if(cacheResultss) {
				return callback(null, cacheResults);
			} else {
				return callback(null);
			};
		});	
	};

	const queryDb = (cacheResults, callback) => {
		if(cacheResults) {
			redis.setex(JSON.stringify(termId), 3600, cacheResults);

			return callback(null, JSON.parse(cacheResults));
		} else {
			Term.find({ _id: termId }, {
				year: 1,
				title: 1,
				date: 1,
				meta: 1
			})
			.populate("year", [ "title" ])
			.limit(1)
			.then(term => {
				if(term.length === 0) {
					return res.status(404).json({
						message: "Term not found" 
					});
				} else {
					redis.setex(JSON.stringify(term[0]._id), 3600, JSON.stringify(term[0]));

					return callback(null, term[0]);
				};
			})
			.catch(err => {
				if(err.kind === "ObjectId") {
					return res.status(404).json({
						message: "Term not found" 
					});
				} else {
					return res.status(500).json({
						message: err.message
					});
				};
			});
		};
	};

	const getYearOptions = (term, callback) => {
		Year.find({ 
			user: term.user,
			title: {
				$ne: term.title
			}
		}, {
			_id: 1,
			title: 1
		})
		.sort({ "date.start": -1 })
		.then(options => {
			if(options.length === 0) {
				return res.status(404).json({
					message: "Could not find your years"
				});
			} else {
				return callback(null, { term, options });
			};
		})
		.catch(err =>{
			return res.status(500).json({
				message: err.message
			});
		});
	};

	async.waterfall([
		checkCache,
		queryDb,
		getYearOptions
	], (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message
			});
		} else {
			return res.status(200).json(results);
		};
	});
};

exports.update = (req, res) => {
	const { _id } = req.user;
	const { termId } = req.params;
	const { year, title, start, end, createdAt } = req.body;

	// add class keys when class models are finalized
	const redisTermsKey = `${_id}:terms`;
	const redisCoursesKey = `${_id}:courses`;
	const redisAssessmentsReadKey = `${_id}:assessmentsRead`;
	const redisAssessmentsFilterKey = `${_id}:assessmentsFilter`;
	const redisTasksReadKey = `${_id}:tasksRead`;
	const redisTasksFilterKey = `${_id}:tasksFilter`;
	
	const updateDb = callback => {
		const update = {
			user: _id,
			year,
			title,
			date: {
				start,
				end
			},
			meta: {
				createdAt,
				updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
			}	
		};
	
		Term.updateOne({ _id: termId }, {
			$set: update
		})
		.then(term => {
			if(term.length === 0) {
				return res.status(404).json({
					message: "Term not found"
				});
			} else {
				return callback(null, term);
			};
		})
		.catch(err => {
			if(err.kind === "ObjectId") {
				return res.status(404).json({
					message: "Term not found"
				});
			} else {
				return res.status(500).json({
					message: err.message
				});
			};
		});
	};

	const updateCache = (term, callback) => {
		redis.del(redisTermsKey);
		redis.del(redisCoursesKey);
		redis.del(redisAssessmentsReadKey);
		redis.del(redisAssessmentsFilterKey);
		redis.del(redisTasksReadKey);
		redis.del(redisTasksFilterKey);

		delete term.user;

		redis.setex(JSON.stringify(term._id), 3600, JSON.stringify(term));

		delete term.meta;			

		return callback(null, {
			message: "Term updated",
			term
		});
	};

	async.waterfall([
		updateDb,
		updateCache
	], (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message
			});
		} else {
			return res.status(200).json(results);
		};
	});
};

exports.delete = (req, res) => {
	const { termId } = req.params;

	// add class keys when class models are finalized
	const redisTermsKey = `${_id}:terms`;
	const redisCoursesKey = `${_id}:courses`;
	const redisAssessmentsReadKey = `${_id}:assessmentsRead`;
	const redisAssessmentsReadKey = `${_id}:assessmentsFilter`;
	const redisTasksReadKey = `${_id}:tasksRead`;
	const redisTasksFilterKey = `${_id}:tasksFilter`;
	
	const clearCache = callback => {
		redis.del(redisTermsKey);
		redis.del(redisCoursesKey);
		redis.del(redisAssessmentsReadKey);
		redis.del(redisAssessmentsFilterKey);
		redis.del(redisTasksReadKey);
		redis.del(redisTasksFilterKey);
		redis.del(JSON.stringify(termId));

		return callback(null);
	};

	const deleteFromDb = callback => {
		Term.deleteOne({ _id: termId })
		.then(deletedTerm => {
			if(!deletedTerm) {
				return res.status(404).json({
					message: "Term not found"
				});
			} else {
				return callback(null);
			};
		})
		.catch(err => {
			if(err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).json({
					message: "Term not found"
				});
			} else {
				return res.status(500).json({
					message: err.message
				});
			};
		});
	};

	async.parallel([
		clearCache,
		deleteFromDb
	], (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message
			});
		} else {
			return res.status(200).json({
				message: "Term deleted"
			});
		};
	});
};