const moment = require("moment");

const Year = require("../models/Years");
const ObjectId = require("mongodb").ObjectId;

const controller = [];

controller.create = (req, res) => {
	// const { _id } = req.user;
	const { title, start, end } = req.body;

	Year.create({
		_id: ObjectId(),
		user: ObjectId("5deb33a40039c4286179c4f1"),
		title,
		date: {
			start,
			end
		}
	})
	.then(newYear => {
		return res.status(201).json({
			message: "New year created", 
			newYear
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

	Year.find({ user: ObjectId("5deb33a40039c4286179c4f1") }, {
		title: 1,
		date: 1
	})
	.sort({ "date.start": -1 })
	.then(years => {
		if(years.length === 0) {
			return res.status(404).json({
				message: "No years were found"
			});
		} else {
			return res.status(200).json(years);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

controller.edit = (req, res) => {
	const { yearId } = req.params;

	Year.find({ _id: yearId }, {
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
			return res.status(200).json(year);
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

controller.update = (req, res) => {
	const { yearId } = req.params;
	const { title, start, end, createdAt } = req.body;

	const update = {
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
	.then(revisedYear => {
		if(!revisedYear.length === 0) {
			return res.status(404).json({
				message: "Year not found"
			});
		} else {
			return res.status(200).json({
				message: "Your year has been updated",
				update
			});
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

controller.delete = (req, res) => {
	const { yearId } = req.params;

	Year.deleteOne({ _id: yearId })
	.then(deletedYear => {
		if(!deletedYear) {
			return res.status(404).json({
				message: "Year not found"
			});
		} else {
			return res.status(200).json({
				message: "Your year has been deleted"
			});
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

module.exports = controller;