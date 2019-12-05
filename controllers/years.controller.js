const moment = require("moment");

const User = require("../models/User.model");

const controller = [];

// controller.newYear = (req, res) => {
// 	const { _id } = req.user[0];
	
// 	User.find({ _id }, {

// 	})
// 	.then(() => {
		
// 	})
// 	.catch(err => {
// 		return res.status(500).json({
// 			message: err.message || "An error occurred on the server while processing your request" 
// 		});
// 	});
// };

controller.create = (req, res) => {
	// const { _id } = req.user[0];
	const { title, start, end } = req.body;

	const newYear = {
		_id: ObjectId(),
		title,
		date: {
			start,
			end
		}
	};

	User.updateOne({ "_id" : ObjectId("5de6b622081d499ca25d8759") }, {
		$push: {
			year: newYear
		}
	})
	.then(() => {
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
	const { _id } = req.user[0];

	User.find({ }, {
		"": 1,
		"": 1
	})
	.sort()
	.then()
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

controller.edit = (req, res) => {
	const { yearId } = req.params;

	User.find({ year: { _id: ObjectId(yearId) } })
	.limit(1)
	.then(year => {
		if(!year) {
			return res.status(404).json({
				message: "The server was unable to find the selected academic year"
			});
		} else {
			return res.status(200).json(year);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
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

controller.update = (req, res) => {
	const { yearId } = req.params;
	const { title, start, end } = req.body;

	const update = {
		title,
		date: {
			start,
			end
		},
		meta: {
			updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
		}
	}

	User.findOne({ "year._id": yearId })
	.then(something => {
		console.log(something);
		
		thisYear = something.year.findIndex(elem => elem._id = yearId);
		something.year[thisYear] = {
			...something.year[thisYear],
			update
		}

		console.log(something.year);
		something.save()
		.then(yes => {
			console.log(yes);
		})
	})
	

	User.updateOne({ "year._id": yearId }, update)
	.then(revisedYear => {
		if(!revisedYear.length === 0) {
			return res.status(404).json({
				message: "The server was unable to find your recently updated year"
			});
		} else {
			return res.status(200).json({
				message: "Year has been updated",
				update
			});
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the academic year"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while updating the academic year"
			});
		};
	});
};

controller.delete = (req, res) => {
	const { yearId } = req.params;

	User.updateOne({ "year._id": yearId },{
		$pull: {
			year: {
				_id: yearId
			}
		}
	})
	.then(deletedYear => {
		if(!deletedYear) {
			return res.status(404).json({
				message: "The server was unable to find the selected academic year"
			});
		} else {
			return res.status(200).json(deletedYear);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The server was unable to find the selected academic year"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while deleting this academic year"
			});
		};
	});
};

module.exports = controller;