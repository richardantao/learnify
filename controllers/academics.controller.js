const async = require("async");
const moment = require("moment");

// import model
const User = require("../models/User.model");
// const Year = require("../models/Years.model");

// instantiate controller
const controller = [];

controller.index = (req, res) => {
	const { _id } = req.user[0];

	async.parallel({
		years: (callback) => {
			User.find({ _id }, {
				"year.title": 1,
				"year.date": 1
			})
			.sort({ "year.date.start": -1 })
			.then(years => {
				if(!years) {
					return res.status(404).json({
						message: "The server was unable to find your academic years"
					});
				} else {
					res.status(200).json(years);	
				};
			})
			.exec(callback)
			.catch(err => {
				return res.status(500).json({
					message: err.message || "An error occurred on the server while retrieving your academic years"
				});
			});
		},
		terms: (callback) => {
			User.find({ _id }, {
				"term.title": 1,
				"term.year": 1,
				"term.date": 1
			})
			.populate({ path: "term.year", select: "title" })
			.sort({ "term.date.start": -1 })
			.then(terms => {
				if(!terms) {
					return res.status(404).json({
						message: "The server was unable to find your terms"
					});
				} else {
					res.status(200).json(terms);
				};
			})
			.exec(callback)
			.catch(err => {
				return res.status(500).json({
					message: err.message || "An error occurred on the server while retrieving your terms"
				});
			});
		},
		courses: (callback) => {
			User.find({ _id }, {
				"course._id": 1,
				"course.term": 1,
				"course.code": 1, 
				"course.title": 1, 
				"course.credit": 1, 
				"course.instructor": 1
			})
			.populate({ path: "course.term", select: "title" })
			.sort({ "course.meta.updatedAt": -1 })
			.then(courses => {
				if(!courses) {
					return res.status(404).json({
						message: "The server was unable to find your courses"
					});
				} else {
					res.status(200).json(courses);
				};
			})
			.exec(callback)
			.catch(err => {
				return res.status(500).json({
					message: err.message || "An error occurred on the server while retrieving your courses"
				});
			});
		}
	}, (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while processing your request"
			});
		} else {
			return res.status(200).json(results);
		};
	});
};

// no data transfer - TENTATIVELY DEPRECATED
controller.newYear = (req, res) => {
	const { _id } = req.user[0];
	
	User.find({ _id }, {

	})
	.then(() => {
		
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while processing your request" 
		});
	});
};

controller.createYear = (req, res) => {
	const _id = req.user[0];
	const { title, start, end } = req.body;

	User.updateOne({ _id }, {
		$push: {
			year: {
				title,
				date: {
					start,
					end
				}
			}
		}
	})
	.then(newYear => {
		console.log(newYear);
		return res.status(201).json(newYear);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while processing your request"
		});
	});
};

// GET request when user tries to edit a specific year
controller.editYear = (req, res) => {
	const { yearId } = req.params;

	User.find({ "year._id": yearId }, {
		"year.title": 1,
		"year.date": 1
	})
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
				message: err.message || "An error occurred on the server while retrieving the selected academic year"
			});
		};
	});
};

// PUT request after user SAVES the Year editer form
controller.updateYear = (req, res) => {
	const { yearId } = req.params;
	const { title, start, end } = req.body;
	
	User.updateOne({ "year._id": yearId }, {
		$set: {
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
	.then(revisedYear => {
		if(!revisedYear) {
			return res.status(404).json({
				message: "The server was unable to find your recently updated year"
			});
		} else {
			return res.status(200).json(revisedYear);
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

controller.deleteYear = (req, res) => {
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

controller.newTerm = (req, res) => {
	const { _id } = req.user[0];
	
	User.find({ _id }, {
		"year._id": 1,
		"year.title": 1,		
	})
	.sort({ "year.date.start": -1 })
	.then(props => {
		if(!props) {
			return res.status(404).json({
				message: "The server was unable to find the resources needed to process this request"
			});
		} else {
			return res.status(200).json(props);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occured on the server while processing your request"
		});
	});
};	
	
controller.createTerm = (req, res) => {
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

controller.editTerm = (req, res) => {
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

controller.updateTerm = (req, res) => {
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

controller.deleteTerm = (req, res) => {
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

// Course controllers
controller.newCourse = (req, res) => {
	const { _id } = req.user[0];
	
	User.find({ _id }, {
		"term._id": 1,
		"term.title": 1
	})
	.sort({ "term.date.start": -1 })
	.then(props => {
		if(!props) {
			return res.status(404).json({
				message: "The server was unable to find the resources required to fulfill your request"
			});
		} else {
			return res.status(200).json(props);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while processing your request"
		});
	});
};
	
controller.createCourse = (req, res) => {
	const { _id } = req.user[0];
	const { term, code, title, instructor, credit, theme } = req.body;
	
	User.updateOne({ _id }, {
		$push: {
			course: {
				term,
				code,
				title,
				instructor,
				credit,
				theme
			}
		}
	})
	.then(newCourse => {
		return res.status(201).json(newCourse);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while creating your new Course"
		});
	});
};

controller.editCourse = (req, res) => {
	const { courseId } = req.params;
	User.find({ "course._id": courseId }, {
		"course.term": 1,
		"course.code": 1,
		"course.title": 1,
		"course.instructor": 1,
		"course.credit": 1,
		"course.theme": 1
	})
	.populate({ path: "course.term", select: "title" })
	.limit(1)
	.then(course => {
		if(!course) {
			return res.status(404).json({
				message: "The server was unable to find the selected course" 
			});
		} else {
			return res.status(200).json(course);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the selected Course" 
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured on the server while retrieving the selected Course" 
			});
		};
	});
};

controller.updateCourse = (req, res) => {
	const { courseId } = req.params;
	const { term, code, title, credit, instructor, theme } = req.body;
	
	User.updateOne({ "course._id": courseId }, {
		$set: {
			term,
			code,
			title,
			credit,
			instructor,
			theme, 
			meta: {
				updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
			}
		}
	})
	.then(revisedCourse => {
		if(!revisedCourse) {
			return res.status(404).json({
				message: "The server was unable to find the recently updated Course"
			});
		} else {
			return res.status(200).json(revisedCourse);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the selected Course"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while updating this Course"
			});
		};
	});
};

controller.deleteCourse = (req, res) => {
	const { courseId } = req.params;
	
	User.updateOne({ "course._id": courseId }, {
		$pull: {
			course: {
				_id: courseId
			}
		}
	})
	.then(deletedCourse => {
		if(!deletedCourse) {
			return res.status(404).json({
				message: "The server was unable to find the selected Course"
			});
		} else {
			return res.status(200).json(deletedCourse);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The server was unable to find the selected Course"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while deleting this Course"
			});
		};
	});
};

module.exports = controller;