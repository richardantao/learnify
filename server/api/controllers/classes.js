const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

const Class = require("../models/Classes");
const Course = require("../models/Courses");

const redis = require("../../config/cache");

exports.create = (req, res) => {
    const { _id } = req.user;
    const { course, } = req.body;

    const matchTerm = callback => {
        Course.find({ _id: course }, {
            _id: 0,
            term: 1
        })
        .limit(1)
        .then(term => {
            if(term.length === 0) {
                return res.status(404).json({
                    message: "Could not find term"
                });
            } else {
                return callback(null, term[0]);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const saveToDb = (term, callback) => {
        Class.create({

        })
        .then(classes => {
            return callback(null, classes);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const cacheResults = (classes, callback) => {
        redis.setex(JSON.stringify(classes._id), 3600, JSON.stringify(classes));

        delete classes.meta;

        return callback(null, classes);
    };

    async.waterfall([
        matchTerm,
        saveToDb,
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

// define with along with other bulk GETs
exports.read = (req, res) => {
    const { _id } = req.user;

    const redisKey = `${_id}:classes`;

    const checkCache = callback => {
        redis.get(redisKey, (err, cacheResults) => {
            if(err) {
                return res.status(500).json({
                    message: err.message
                }); 
            } else if(cacheResults) {
                return callback(null, cacheResults);    
            } else {
                return callback(null);
            };
        });
    };

    const queryDb = (cacheResults, callback) => {
        if(cacheResults) {

        } else {
            Class.find({  }, {

            })
            .then(payload => {
                if(payload.length === 0) {
                    return res.status(404).json({
                        message: "Classes not found"
                    }); 
                } else {
                    redis.setex(redisKey, 3600, JSON.stringify(payload));

                    const classes = payload.map(classes => {
                        delete classes.modifiedPaths;
                    });

                    return callback(null, classes);
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
    const classId = req.params;

    const checkCache = callback => {
        redis.get(redisKey, (err, cacheResults) => {
            if(err) {
                return res.status(500).json({
                    message: err.message
                }); 
            } else if(cacheResults) {
                return callback(null, cacheResults);    
            } else {
                return callback(null);
            };
        });
    };

    const queryDb = (cacheResults, callback) => {
        if(cacheResults) {
            redis.setex(JSON.stringify(classId), 3600, cacheResults);

            const classes = JSON.parse(cacheResults);

            delete classes.meta;

            return callback(null, classes);
        } else {
            Class.find({  }, {

            })
            .then(classes => {
                if(classes.length === 0) {
                    return res.status(404).json({
                        message: "Class not found"
                    });
                } else {
                    redis.setex(JSON.stringify(classId), 3600, classes);

                    delete classes.meta;

                    return callback(null, classes);
                };
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        };
    };

    const getCourseOptions = (classes, callback) => {
        Course.find({ }, {

        })
        .then()
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
    const { _id } = req.user;

    const matchTerm = callback => {
        
    };

    const updateDb = (term, callback) => {

    };

    const updateCache = (classes, callback) => {

    };

    async.waterfall([
        matchTerm,
        updateDb,
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
    // const { _id } = req.user;
    const classId = req.params;
    
    const clearCache = callback => {
        redis.del(JSON.stringify(classId));

        return callback(null);
    };

    const deleteFromDb = callback => {
        Class.deleteOne({ _id: classId })
        .then(deletedClass => {
            if(!deletedClass) {
                return res.status(404).json({
                    message: "Class not found"
                });
            } else {
                return callback(null);
            };
        })
        .catch(err => {
            if(err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).json({
                    message: "Class not found"
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
                message: "Class deleted"
            });
        };
    });
};