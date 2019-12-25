const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// model
const Term = require("../models/Terms");
const Year = require("../models/Years");

// initialize controller
const controller = [];
	
controller.create = (req, res) => {
	// const { _id } = req.user;
	const { year, title, start, end } = req.body;
	
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
	.then(term => {
		return res.status(201).json({
			message: "New term created",
			term
		});
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

controller.read = (req, res) => {
	const { yearId } = req.params;

	Term.find({ year: yearId }, {
		title: 1,
		date: 1
	})
	.populate("year", [ "title" ])
	.sort({ "date.start": -1})
	.then(terms => {
		if(terms.length === 0) {
			return res.status(404).json({
				message: "No terms were found"
			});
		} else {
			return res.status(200).json(terms);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

controller.edit = (req, res) => {
	const { termId } = req.params;

	const getTerm = (callback) => {
		Term.find({ _id: termId }, {
			user: 1,
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
				callback(null, term);
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

	const getYearOptions = (term, callback) => {
		Year.find({ 
			user: term[0].user,
			title: {
				$ne: term[0].title
			}
		}, {
			title: 1
		})
		.sort({ "date.start": -1 })
		.then(options => {
			if(options.length === 0) {
				return res.status(404).json({
					message: "Could not find your years"
				});
			} else {
				callback(null, { term, options });
			};
		})
		.catch(err =>{
			return res.status(500).json({
				message: err.message
			});
		});
	};

	async.waterfall([
		getTerm,
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

controller.update = (req, res) => {
	const { termId } = req.params;
	const { year, title, start, end, createdAt } = req.body;
	
	const update = {
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
	.then(revisedTerm => {
		if(revisedTerm.length === 0) {
			return res.status(404).json({
				message: "Term not found"
			});
		} else {
			return res.status(200).json({
				message: "Your Term has been updated",
				update
			});
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

controller.delete = (req, res) => {
	const { termId } = req.params;
	
	Term.deleteOne({ _id: termId })
	.then(deletedTerm => {
		if(!deletedTerm) {
			return res.status(404).json({
				message: "Term not found"
			});
		} else {
			return res.status(500).json({
				message: "Your Term has been deleted"
			});
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

module.exports = controller;