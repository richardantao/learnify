const async = require("async");
const moment = require("moment");
const { ObjectId } = require("mongodb");

// models
const Task = require("../models/Tasks");
const Course = require("../models/Courses");

exports.create = (req, res) => {
    const { course, title, type, deadline, completion, description } = req.body;

    const matchTerm = callback => {
        Course.find({ _id: course }, {
            _id: 0,
            term: 1
        })
        .limit(1)
        .then(term => {
            return callback(null, term[0].term);
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    const createTask = (term, callback) => {
        Task.create({
            _id: ObjectId(),
            term,
            course,
            title,
            type,
            deadline: moment(deadline, "YYYY-MM-DD, hh:mm"),
            completion,
            description
        })
        .then(task => {
            return callback(null, task);
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    async.waterfall([ matchTerm, createTask ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(201).json(results);
        };
    });   
};

exports.read = (req, res) => {
    const { term } = req.params;
    const { limit, past } = req.query;

    if(limit) {
        Task.find({ 
            term,
            deadline: {
                $gte: moment().startOf("day"),
                $lt: moment().endOf("day").add(7, "days")
            }
        }, {
            _id: 1,
            course: 1,
            title: 1,
            type: 1,
            deadline: 1,
            completion: 1,
            description: 1
        })
        .populate("course", [ "title" ])
        .sort({ deadline: -1 })
        .then(tasks => {
            if(!tasks) {
                return res.status(404).json({ message: "Tasks not found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message }); 
        });
    } else if(past) {
        Task.find({ 
            term,
            deadline: {
                $lt: moment()
            } 
        }, {
            _id: 1,
            course: 1,
            title: 1,
            type: 1,
            deadline: 1,
            completion: 1,
            description: 1
        })
        .populate("course", [ "title" ])
        .sort({ deadline: -1 })
        .then(tasks => {
            if(!tasks) {
                return res.status(404).json({ message: "Tasks not found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message }); 
        });
    } else {
        Task.find({ 
            term,
            deadline: {
                $gt: moment()
            } 
        }, {
            course: 1,
            title: 1,
            type: 1,
            deadline: 1,
            completion: 1,
            description: 1
        })
        .populate("course", [ "title" ])
        .sort({ deadline: -1 })
        .then(tasks => {
            if(!tasks) {
                return res.status(404).json({ message: "Tasks not found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message }); 
        });
    };
};

exports.filter = (req, res) => {
    const { course } = req.params;
    const { past } = req.query;

    if(past) {
        Task.find({ 
            course,
            deadline: {
                $lt: moment()
            }
        }, {
            course: 1,
            title: 1,
            type: 1,
            deadline: 1,
            completion: 1,
            description: 1
        })
        .populate("course", [ "title" ])
        .sort({ deadline: 1 })
        .then(tasks => {
            if(!tasks) {
                return res.status(404).json({ message: "Tasks not found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    } else {
        Task.find({ 
            course,
            deadline: {
                $gte: moment()
            }
        }, {
            course: 1,
            title: 1,
            type: 1,
            deadline: 1,
            completion: 1,
            description: 1
        })
        .populate("course", [ "title" ])
        .sort({ deadline: 1 })
        .then(tasks => {
            if(!tasks) {
                return res.status(404).json({ message: "Tasks not found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };
};

exports.edit = (req, res) => {
    const { _id } = req.params;

    const getTask = callback => {
        Task.find({ _id }, {
            course: 1,
            title: 1,
            type: 1,
            deadline: 1,
            completion: 1,
            description: 1
        })
        .populate("course", [ "title", "term" ])
        .limit(1)
        .then(task => {
            if(!task) {
                return res.status(404).json({ message: "Task not found" });
            } else {                
                return callback(null, task[0]);
            };
        })
        .catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).json({ message: "Task not found" });
            } else {
                return res.status(500).json({ message: err.message });
            };
        });
    };

    const fetchCourseOptions = (task, callback) => {
        Course.find({ 
            term: task.course.term,
            title: {
                $ne: task.course.title
            }
        }, {
            title: 1
        })
        .sort({ title: 1 })
        .then(options => {
            if(!options) {
                return res.status(404).json({ message: "No task options found" });
            } else {
                return callback(null, { task, options });
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    async.waterfall([ getTask, fetchCourseOptions ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(200).json(results);
        };
    });   
};

exports.patch = (req, res) => {
    const { _id } = req.params;

    const getStatus = callback => {
        Task.find({ _id }, {
            _id: 0,
            completed: 1
        })
        .then(status => {
            if(!status) {
                return callback(null, { status: false});
            } else {
                return callback(null, { status: true });
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    const toggleStatus = (status, callback) => {
        if(!status) {
            Task.updateOne({ _id }, {
                $set: {
                    completed: false
                }
            })
            .then(() => {
                return callback(null, { message: "Changing task to complete in " }); 
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        } else {
            Task.updateOne({ _id }, {
                $set: {
                    completed: true
                }
            })
            .then(() => {
                return callback(null, { message: "Changing task to incomplete in " }); 
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        };
    };

    async.waterfall([ getStatus, toggleStatus ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(200).json(results);
        };
    });
};

exports.update = (req, res) => {
    const { _id } = req.params;
    const { course, title, type, deadline, completion, description } = req.body;

    const matchTerm = callback => {
        Course.find({ _id: course }, {
            _id: 0,
            term: 1
        })
        .limit(1)
        .then(term => {
            if(!term) {
                return res.status(404).json({ message: "Term not found" });
            } else {
                return callback(null, term[0].term);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    const updateTask = (term, callback) => {
        Task.updateOne({ _id }, {
            $set: {
                term,
                course,
                title, 
                type, 
                deadline: moment(deadline, "YYYY-MM-DD, hh:mm"), 
                completion, 
                description
            }
        })
        .then(task => {
            if(task.n === 1) {
                return callback(null, { message: "Task updated" });
            } else {
                return res.status(404).json({ message: "Task not found" }); 
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    }

    async.waterfall([
        matchTerm,
        updateTask
    ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(200).json(results);
        };
    });
};

exports.delete = (req, res) => {
    const { _id } = req.params;

    Task.deleteOne({ _id })
    .then(task => {
        if(task.deletedCount === 1) {
            return res.status(200).json({ message: "Task deleted" });
        } else {
            return res.status(404).json({ message: "Task not found" });
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({ message: "Task not found" });
        } else {
            return res.status(500).json({ message: err.message });
        };
    });
};