const moment = require("moment");

const User = require("../models/User.model");

const controller = [];

// controller.newTerm = (req, res) => {
// 	const { _id } = req.user[0];
	
// 	User.find({ _id }, {
// 		"year._id": 1,
// 		"year.title": 1,		
// 	})
// 	.sort({ "year.date.start": -1 })
// 	.then(props => {
// 		if(!props) {
// 			return res.status(404).json({
// 				message: "The server was unable to find the resources needed to process this request"
// 			});
// 		} else {
// 			return res.status(200).json(props);
// 		};
// 	})
// 	.catch(err => {
// 		return res.status(500).json({
// 			message: err.message || "An error occured on the server while processing your request"
// 		});
// 	});
// };	
	
controller.create = (req, res) => {
	const { _id } = req.user[0];
	const { year, title, start, end } = req.body;
	
	User.updateOne({ _id }, {
		$push: {
			term: {
				year,
				title,
				date: {
					start,
					end
				}
			}
		}
	})
	.then(newTerm => {
		return res.status(201).json(newTerm);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occured on the server while creating your new Term"
		});
	});
};

controller.read = (req, res) => {
    
};

controller.edit = (req, res) => {
	const { termId } = req.params;

	User.find({ "term._id": termId }, {
		"term.year": 1,
		"term.title": 1,
		"term.date": 1
	})
	.populate({ path: "term.year", select: "title" })
	.limit(1)
	.then(term => {
		if(!term) {
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
				message: err.message || "An error occurred on the server while retrieving the selected Term" 
			});
		};
	});
};

controller.update = (req, res) => {
	const { termId } = req.params;
	const { year, title, start, end } = req.body;
	
	User.updateOne({ "term._id": termId }, {
		$set: {
			year,
			title,
			date: {
				start,
				end
			},
			meta: {
				updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
			}	
		}
	})
	.then(revisedTerm => {
		if(!revisedTerm) {
			return res.status(404).json({
				message: "The server was unable to find the recently updated Term"
			});
		} else {
			return res.status(200).json(revisedTerm);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the selected Term"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while updating this Term"
			});
		};
	});
};

controller.delete = (req, res) => {
	const { termId } = req.params;
	
	User.updateOne({ "term._id": termId }, {
		$pull: {
			term: {
				_id: termId
			}
		}
	})
	.then(deletedTerm => {
		if(!deletedTerm) {
			return res.status(404).json({
				message: "The server was unable to find the selected Term"
			});
		} else {
			return res.status(500).json(deletedTerm);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The server was unable to find the selected Term"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while deleting this Term"
			});
		};
	});
};

module.exports = controller;