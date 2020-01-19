const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// models
const Task = require("../models/Tasks");
const Course = require("../models/Courses");

const redis = require("../config/cache");

exports.create = (req, res) => {
    const { course, title, type, deadline, completion, description } = req.body;

    const redisKey = JSON.stringify();

    const matchTerm = callback => {
        Course.find({ _id: course }, {
            term: 1,
            _id: 0
        })
        .limit(1)
        .then(term => {
            if(term.length === 0) {
                return res.status(404).json({
                    message: "Could not find term"
                });
            } else {
                callback(null, term[0]);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const createTask = (term, callback) => {
        Task.create({
            _id: ObjectId(),
            term: term.term,
            course,
            title,
            type,
            deadline,
            completion,
            description
        })
        .then(task => {
            callback(null, task);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const cacheResults = (task, callback) => {
        redis.del(redisKey);
        redis.setex(JSON.stringify(task._id), 3600, JSON.stringify(task));

        callback(null, {
            task,
            message: "New task created"
        });
    };

    async.waterfall([
        matchTerm,
        createTask,
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
    const { termId } = req.params;

    const redisKey = JSON.stringify();

    const checkCache = callback => {
        redis.get(redisKey, (err, cacheResults) => {
            if(err) {
                return res.status(500).json({
                    message: err.message
                });
            } else if(cacheResults) {
                callback(null, JSON.parse(cacheResults));
            } else {
                callback(null);
            };
        });
    };

    const queryDb = (cacheResults, callback) => {
        if(cacheResults) {
            callback(null, cacheResults);
        } else {
            Task.find({ term: termId }, {
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
                if(tasks.length === 0) {
                    return res.status(404).json({
                        message: "No tasks found"
                    });
                } else {
                    redis.setex(redisKey, 3600, JSON.stringify(tasks));

                   callback(null, tasks);
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

exports.filter = (req, res) => {
    const { courseId } = req.params;

    const redisKey = JSON.stringify();

    const checkCache = callback => {
        redis.get(redisKey, (err, cacheResults) => {
            if(err) {
                return res.status(500).json({
                    message: err.message
                });
            } else if (cacheResults) {
                callback(null, JSON.parse(cacheResults));
            } else {
                callback(null);
            };
        });
    };

    const queryDb = (cacheResults, callback) => {
        if(cacheResults) {
            callback(null, cacheResults);
        } else {
            Task.find({ course: courseId }, {
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
                if(tasks.length === 0) {
                    return res.status(404).json({
                        message: "No tasks found"
                    });
                } else {
                    redis.setex(redisKey, 3600, JSON.stringify(tasks));

                    callback(null, tasks);
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
    const { taskId } = req.params;
    
    const checkCache = callback => {
        redis.get(JSON.stringify(taskId), (err, cacheResult) => {
            if(err) {
                return res.status(500).json({
                    message: err.message
                });
            } else if(cacheResult) {
                callback(null, JSON.parse(cacheResult));
            } else {
                callback(null);
            };
        });
    };

    const queryDb = (cacheResult, callback) => {
        if(cacheResult) {
            callback(null, cacheResult);
        } else {
            Task.find({ _id: taskId }, {
                course: 1,
                title: 1,
                type: 1,
                deadline: 1,
                completion: 1,
                description: 1,
                meta: 1
            })
            .populate("course", [ "title", "term" ])
            .limit(1)
            .then(task => {
                if(task.length === 0) {
                    return res.status(404).json({
                        message: "Task not found"
                    });
                } else {
                    redis.setex(task[0]._id, 3600, task[0]);

                    callback(null, task[0]);
                };
            })
            .catch(err => {
                if(err.kind === "ObjectId") {
                    return res.status(404).json({
                        message: "Task not found"
                    });
                } else {
                    return res.status(500).json({
                        message: err.message
                    });
                };
            });
        };
    };

    const getCourseOptions = (task, callback) => {
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
            if(options.length === 0) {
                return res.status(404).json({
                    message: "No task options found"
                });
            } else {
                callback(null, { task, options });
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    async.waterfall([
        checkCache, 
        queryDb,
        getCourseOptions
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
    const { taskId } = req.params;
    const { course, title, type, deadline, completion, description, createdAt } = req.body;

    const redisKey = JSON.stringify();

    const matchTerm = (callback) => {
        Course.find({ _id: course }, {
            term: 1,
            _id: 0
        })
        .limit(1)
        .then(term => {
            if(term.length === 0) {
                return res.status(404).json({
                    message: "Could not find term"
                });
            } else {
                callback(null, term[0]);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const updateTask = (term, callback) => {
        const task = {
            term: term.term,
            course,
            title, 
            type, 
            deadline, 
            completion, 
            description,
            meta: {
                createdAt,
                updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
            }   
        };
    
        Task.updateOne({ _id: taskId }, {
            $set: task
        })
        .then(task => {
            if(!task) {
                return res.status(404).json({
                    message: "Task not found"
                }); 
            } else {
                callback(null, task);
            };
        })
        .catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).json({
                    message: "Task not found"
                }); 
            } else {
                return res.status(500).json({
                    message: err.message
                });
            };
        });
    };

    const updateCache = (task, callback) => {
        redis.del(redisKey);

        redis.setex(task._id, 3600, task);

        callback(null, { message: "Task updated" });
    };

    async.waterfall([
        matchTerm,
        updateTask,
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
    const { taskId } = req.params;

    const redisKey = JSON.stringify();
    
    const clearCache = callback => {
        redis.del(redisKey);
        redis.del(JSON.stringify(taskId));

        callback(null);
    };

    const deleteFromDb = callback => {
        Task.deleteOne({ _id: taskId })
        .then(deletedTask => {
            if(!deletedTask) {
                return res.status(404).json({
                    message: "Task not found"
                });
            } else {
                callback(null);
            };
        })
        .catch(err => {
            if(err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).json({
                    message: "Task not found"
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
                message: "Task deleted"
            });
        };
    });
};