const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// model
const Term = require("../models/Terms.model");

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
	.then(newTerm => {
		return res.status(201).json({
			message: "New term created",
			newTerm
		});
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

controller.read = (req, res) => {
	// const { _id } = req.user;
	
	Term.find({ user: ObjectId("5deb33a40039c4286179c4f1") }, {
		title: 1,
		date: 1
	})
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

controller.filter = (req, res) => {
	const { yearId } = req.params;

	Term.find({ year: yearId }, {
		title: 1,
		date: 1
	})
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
				message: "The server was unable to find the selected Term" 
			});
		} else {
			return res.status(200).json(term);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the selected Term" 
			});
		} else {
			return res.status(500).json({
				message: err.message
			});
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
				message: "The server was unable to find the recently updated Term"
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
				message: "The server was unable to find the selected Term"
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
				message: "The server was unable to find the selected Term"
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
				message: "The server was unable to find the selected Term"
			});
		} else {
			return res.status(500).json({
				message: err.message
			});
		};
	});
};

module.exports = controller;