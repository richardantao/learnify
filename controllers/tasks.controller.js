const moment = require("moment");

const User = require("../models/User.model");

const controller = [];

// controller.newTask = (req, res) => {
//     const { _id } = req.user[0];

//     User.find({ _id }, {
//         "course._id": 1, 
// 		"course.title": 1
//     })
//     .sort({ "course.meta.updatedAt": -1 })
// 	.then(courses => {
// 		if(!courses) {
// 			return res.status(404).json({
// 				message: "The server was unable to find your courses"
// 			});
// 		} else {
// 			return res.status(200).json(courses);
// 		};
// 	})
// 	.catch(err => {
// 		if(err.kind === "ObjectId") {
// 			return res.status(404).json({
// 				message: "The server was unable to find your courses"
// 			});
// 		} else {
// 			return res.status(500).json({
// 				message: err.message || "An error occurred on the server while retrieving your courses"
// 			});
// 		}
// 	});
// };

controller.create = (req, res) => {
    const { _id } = req.user[0];
    const { course, title, type, deadline, completion, description } = req.body;

    User.updateOne({ _id }, {
        $push: {
            task: {
                course,
                title,
                type,
                deadline,
                completion,
                description
            }
        }
    })
    .then(newTask => {
        return res.status(201).json(newTask);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occurred on the server while creating this task"
        });
    });
};

controller.read = (req, res) => {

};

controller.edit = (req, res) => {
    const { taskId } = req.params;
    
    User.find({ "task._id": taskId }, {
        "task.course": 1,
        "task.title": 1,
        "task.type": 1,
        "task.deadline": 1,
        "task.completion": 1,
        "task.description": 1
    })
    .populate({ path: "task.course", select: "title"})
    .limit(1)
	.then(task => {
		if(!task) {
			return res.status(404).json({
				message: "The server was unable to find this task"
			});
		} else {
			return res.status(200).json(task);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "the server was unable to find this task"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while retrieving this task"
			});
		};
	});
};

controller.update = (req, res) => {
    const { taskId } = req.params;
    const { course, title, type, deadline, completion, description } = req.body;

    User.updateOne({ "task._id": taskId }, {
        $set: {
            course,
            title, 
            type, 
            deadline, 
            completion, 
            description,
            meta: {
                updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
            }   
        }
    })
    .then(revisedTask => {
        if(!revisedTask) {
            return res.status(404).json({
                message: "The server was unable to find your recently updated task"
            }); 
        } else {
            return res.status(201).json(revisedTask);
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).json({
                message: "The server was unable to find this task"
            }); 
        } else {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while processing your request"
            });
        };
    });
};

controller.delete = (req, res) => {
    const { taskId } = req.params;

    User.updateOne({ "task._id": taskId }, {
        $pull: {
            task: {
                "task._id": taskId
            }
        }
    })
    .then(deletedTask => {
        if(!deletedTask) {
            return res.status(404).json({
                message: "The server was unable to find this task"
            });
        } else {
            return res.status(200).json(deletedTask);
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({
                message: "The server was unable to find this task"
            });
        } else {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while processing your request"
            });
        };
    });
};

module.exports = controller;