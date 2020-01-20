const moment = require("moment");

const Year = require("../models/Years");
const ObjectId = require("mongodb").ObjectId;

const redis = require("../config/cache");

exports.create = (req, res) => {
	const { _id } = req.user;
	const { title, start, end } = req.body;

	const redisYearsKey = `${_id}:years`;

	const saveToDb = callback => {
		Year.create({
			_id: ObjectId(),
			user: ObjectId("5deb33a40039c4286179c4f1"), // get from cookie in production
			title,
			date: {
				start,
				end
			}
		})
		.then(year => {
			return callback(null, year);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message
			});
		});
	};

	const cacheResults = (year, callback) => {
		redis.del(redisYearsKey);

		delete year.user;

		redis.setex(JSON.stringify(year._id), 3600, JSON.stringify(year));

		delete year.meta;

		return callback(null, { 
			message: "New year created",
			year
		});
	};

	async.waterfall([
		saveToDb,
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
	const redisKey = `${_id}:years`;

	const checkCache = callback => {
		redis.get(redisKey, (err, cacheResults) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				});
			} else if(cacheResults) {
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

			const years = cacheResults.map(year => {
				delete year.meta;
			});

			return callback(null, years);
		} else {
			Year.find({ user: ObjectId("5deb33a40039c4286179c4f1") }, {
				_id: 1,
				title: 1,
				date: 1,
				meta: 1
			})
			.sort({ "date.start": -1 })
			.then(payload => {
				if(payload.length === 0) {
					return res.status(404).json({
						message: "No years were found"
					});
				} else {
					redis.setex(redisKey, 3600, JSON.stringify(payload));

					const years = payload.map(year => {
						delete year.meta;
					});

					return callback(null, years);
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
	const { yearId } = req.params;

	const checkCache = callback => {
		redis.get(JSON.stringify(yearId), (err, cacheResults) => {
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
		if (cacheResults) {
			redis.setex(JSON.stringify(yearId), 3600, cacheResults);

			return callback(null, JSON.parse(cacheResults));
		} else {		
			Year.find({ _id: yearId }, {
				_id: 1,
				title: 1,
				date: 1,
				meta: 1
			})
			.limit(1)
			.then(year => {
				if(year.length === 0) {
					return res.status(404).json({
						message: "Year not found"
					});
				} else {
					redis.setex(JSON.stringify(year[0]._id), 3600, JSON.stringify(year[0]));

					return callback(null, year[0]);
				};
			})
			.catch(err => {
				if(err.kind === "ObjectId") {
					return res.status(404).json({
						message: "Year not found"
					});
				} else {
					return res.status(500).json({
						message: err.message
					});
				};
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

exports.update = (req, res) => {
	const { _id } = req.user; 
	const { yearId } = req.params;
	const { title, start, end, createdAt } = req.body;

	const redisYearsKey = `${_id}:years`;
	const redisTermsKey = `${_id}:terms`;

	const updateDb = callback => {
		const update = {
			_id: yearId,
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
	
		Year.updateOne({ _id: yearId }, {
			$set: update
		})
		.then(year => {
			if(year.length === 0) {
				return res.status(404).json({
					message: "Year not found"
				});
			} else {
				return callback(null, year);
			};
		})
		.catch(err => {
			if(err.kind === "ObjectId") {
				return res.status(404).json({
					message: "Year not found"
				});
			} else {
				return res.status(500).json({
					message: err.message
				});
			};
		});
	};

	const updateCache = (year, callback) => {
		redis.del(redisYearsKey);
		redis.del(redisTermsKey);

		redis.setex(JSON.stringify(year._id), 3600, JSON.stringify(year));
		
		delete year.meta;

		return callback(null, {
			message: "Your year has been updated",
			year
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
	const { _id } = req.user;
	const { yearId } = req.params;

	const redisYearsKey = `${_id}:years`;
	const redisTermsKey = `${_id}:terms`;

	const clearCache = callback => {
		redis.del(JSON.stringify(yearId));
		redis.del(redisYearsKey);
		redis.del(redisTermsKey);

		return callback(null);
	};

	const deleteFromDb = callback => {
		Year.deleteOne({ _id: yearId })
		.then(year => {
			if(!year) {
				return res.status(404).json({
					message: "Year not found"
				});
			} else {
				return callback(null);
			};
		})
		.catch(err => {
			if(err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).json({
					message: "The server was unable to find the selected academic year"
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
				message: "Year deleted"
			});
		};
	});
};