const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// model
const Term = require("../models/Terms");
const Year = require("../models/Years");
	
exports.create = (req, res) => {
	const { year, title, start, end } = req.body;

	Term.create({
		_id: ObjectId(),
		year,
		title,
		date: {
			start: moment(start, "YYYY-MM-DD"),
			end: moment(end, "YYYY-MM-DD"),
		}
	})
	.then(term => {
		return res.status(201).json({
			term,
			message: "Term created"
		});
	})	
	.catch(err => {
		return res.status(500).json({ message: err.message });
	});
};

exports.read = (req, res) => {
	const { yearId } = req.params;

	Term.find({ year: yearId }, {
		_id: 1, 
		year: 1,
		title: 1,
		date: 1
	})
	.sort({ "date.start": -1 }) 
	.then(terms => {
		if(terms.length === 0) {
			return res.status(404).json({ message: "No terms found" });
		} else {
			return res.status(200).json(terms);
		};
	})
	.catch(err => {
		return res.status(500).json({ message: err.message });
	});
};

exports.edit = (req, res) => {
	// const { _id } = req.user; 
	const _id = ObjectId("5deb33a40039c4286179c4f1"); // testing
	const { termId } = req.params;

	const getTerm = callback => {
		Term.find({ _id: termId }, {
			_id: 1,
			year: 1,
			title: 1,
			date: 1
		})
		.populate("year", [ "title" ])
		.limit(1)
		.then(term => {
			if(term.length === 0) {
				return res.status(404).json({ message: "Term not found" });
			} else {
				return callback(null, term[0]);
			};
		})
		.catch(err => {
			if(err.kind === "ObjectId") {
				return res.status(404).json({ message: "Term not found" });
			} else {
				return res.status(500).json({ message: err.message });
			};
		});
	};

	const fetchYearOptions = (term, callback) => {
		Year.find({ 
			user: _id,
			title: {
				$ne: term.year.title
			}
		}, {
			_id: 1,
			title: 1
		})
		.sort({ "date.start": -1 })
		.then(options => {
			if(options.length === 0) {
				return res.status(404).json({ message: "Years not found" });
			} else {
				return callback(null, { term, options });
			};
		})
		.catch(err =>{
			return res.status(500).json({ message: err.message });
		});
	};

	async.waterfall([
		getTerm,
		fetchYearOptions
	], (err, results) => {
		if(err) {
			return res.status(500).json({ message: err.message });
		} else {
			return res.status(200).json(results);
		};
	});
};

exports.update = (req, res) => {
	const { termId } = req.params;
	const { year, title, start, end } = req.body;

	Term.updateOne({ _id: termId }, {
		$set: {
			year,
			title,
			date: {
				start: moment(start, "YYYY-MM-DD"),
				end: moment(end, "YYYY-MM-DD"),
			}
		}
	})
	.then(term => {
		if(term.length === 0) {
			return res.status(404).json({ message: "Term not found" });
		} else {
			return res.status(200).json({ message: "Term updated" });
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({ message: "Term not found" });
		} else {
			return res.status(500).json({ message: err.message });
		};
	});
	
};

exports.delete = (req, res) => {
	const { termId } = req.params;

	Term.deleteOne({ _id: termId })
	.then(deletedTerm => {
		if(!deletedTerm) {
			return res.status(404).json({ message: "Term not found" });
		} else {
			return res.status(200).json({ message: "Term deleted" });
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({ message: "Term not found" });
		} else {
			return res.status(500).json({ message: err.message });
		};
	});
};