const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// models
const Course = require("../models/Courses");
const Assessment = require("../models/Assessments");

// cache
const redis = require("../config/cache");

exports.create = (req, res) => {
    const { _id } = req.user;
    const { course, title, type, start, end, location, weight, score } = req.body;

    const redisAssessmentsReadKey = `${_id}:assessmentsRead`;
    const redisAssessmentsFilterKey = `${_id}:assessmentsFilter`;

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
        Assessment.create({
            _id: ObjectId(),
            term: term.term,
            course,
            title,
            type,
            date: {
                start,
                end
            },
            location,
            grade: {
                weight,
                score
            }
        })
        .then(assessment => {
            return callback(null, assessment);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const cacheResults = (assessment, callback) => {
        redis.del(redisAssessmentsReadKey);
        redis.del(redisAssessmentsFilterKey);
        redis.setex(JSON.stringify(assessment._id), 3600, JSON.stringify(assessment));
      
        delete assessment.meta;	 

        return callback(null, { 
            assessment,
            message: "New assessment created" 
        });
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

exports.read = (req, res) => {
    const { _id } = req.user;
    const { termId } = req.params;

    const redisKey = `${_id}:assessmentsRead`;

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
            redis.setex(redisKey, 3600, cacheResults);

            JSON.parse(cacheResults);

            const assessments = cacheResults.map(assessment => {
                delete assessment.meta;
            });

            return callback(null, assessments);
        } else {
            Assessment.find({ term: termId }, {
                course: 1,
                title: 1,
                type: 1,
                date: 1,
                location: 1,
                meta: 1
            })
            .populate("course", [ "title" ])
            .sort({ "date.start": 1 })
            .then(payload => {
                if(payload.length === 0) {
                    return res.status(404).json({
                        message: "No assessments found"
                    });
                } else {
                    redis.setex(redisKey, 3600, JSON.stringify(payload));

                    const assessments = payload.map(assessment => {
                        delete assessment.meta;
                    });

                    return callback(null, assessments);
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
    const { _id } = req.user;
    const { courseId } = req.params;

    const redisKey = `${_id}:assessmentsFilter`;

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
            redis.setex(redisKey, 3600, cacheResults);

            JSON.parse(cacheResults);

            const assessments = cacheResults.map(assessment => {
                delete assessment.meta;
            });

            return callback(null, assessments);
        } else {
            Assessment.find({ course: courseId }, {
                course: 1,
                title: 1,
                type: 1,
                date: 1,
                location: 1,
                meta: 1
            })
            .populate("course", [ "title" ])
            .sort({ "date.start": 1 })
            .then(payload => {
                if(payload.length === 0) {
                    return res.status(404).json({
                        message: "No assessments found"
                    });
                } else {
                    redis.setex(redisKey, 3600, JSON.stringify(payload));

                    const assessments = payload.map(assessment => {
                        delete assessment.meta;
                    });

                   return callback(null, assessments);
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
    const { assessmentId } = req.params;
    
    const checkCache = callback => {
        redis.get(JSON.stringify(assessmentId), (err, cacheResult) => {
            if(err) {
                return res.status(500).json({
                    message: err.message
                });
            } else if(cacheResult) {
                return callback(null, cacheResult);
            } else {
                return callback(null);
            };
        });
    };

    const queryDb = (cacheResults, callback) => {
        if(cacheResults) {
            redis.setex(JSON.stringify(assessmentId), 3600, cacheResults);

            return callback(null, JSON.parse(cacheResults));
        } else {
            Assessment.find({ _id: assessmentId }, {
                course: 1,
                title: 1,
                type: 1,
                date: 1,
                location: 1,
                grade: 1,
                meta: 1
            })
            .populate("course", [ "title", "term" ])
            .limit(1)
            .then(assessment => {
                if(assessment.length === 0) {
                    return res.status(404).json({
                        message: "Assessment not found"
                    });
                } else {
                    redis.setex(JSON.stringify(assessment[0]._id), 3600, JSON.stringify(assessment[0]));

                    return callback(null, assessment[0]);
                };
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        };
    };

    const getCourseOptions = (assessment, callback) => {
        Course.find({ 
            term: assessment.course.term,
            title: {
                $ne: assessment.course.title
            }
        }, {
            title: 1
        })
        .sort({ title: 1 })
        .then(options => {
            if(options.length === 0) {
                return res.status(404).json({
                    message: "Course options not found"
                });
            } else {
                callback(null, { assessment, options });
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
    const { _id } = req.user;
    const { assessmentId } = req.params;
    const { course, title, type, start, end, location, weight, score, createdAt } = req.body;

    const redisAssessmentsReadKey = `${_id}:assessmentsRead`;
    const redisAssessmentsFilterKey = `${_id}:assessmentsFilter`;

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
                return callback(null, term[0]);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const updateDb = (term, callback) => {
        const assessment = {
            term: term.term,
            course,
            title,
            type,
            date: {
                start,
                end
            }, 
            location,
            grade: {
                weight,
                score
            },
            meta: {
                createdAt,
                updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
            }
        };
    
        Assessment.updateOne({ _id: assessmentId }, {
            $set: assessment
        })
        .then(revisedAssessment => {
            if(revisedAssessment.length === 0) {
                return res.status(404).json({
                    message: "No assessment found"
                });
            } else {
                return callback(null, assessment);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const updateCache = (assessment, callback) => {
        redis.del(redisAssessmentsReadKey);
        redis.del(redisAssessmentsFilterKey);
        redis.setex(JSON.stringify(assessment._id), 3600, JSON.stringify(assessment));

        delete assessment.meta;

        callback(null, {
            assessment,
            message: "Assessment updated"
        })
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
    const { assessmentId } = req.params;

    const redisAssessmentsReadKey = `${_id}:assessmentsRead`;
    const redisAssessmentsFilterKey = `${_id}:assessmentsFilter`;

    const clearCache = callback => {
        redis.del(redisAssessmentsReadKey);
        redis.del(redisAssessmentsFilterKey);
        redis.del(JSON.stringify(assessmentId));

        return callback(null);
    };

    const deleteFromDb = callback => {
        Assessment.deleteOne({ _id: assessmentId })
        .then(deletedAssessment => {
            if(!deletedAssessment) {
                return res.status(404).json({
                    message: "Assessment not found"
                });
            } else {
                return callback(null);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
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
                message: "Assessment deleted"
            });
        };
    });
};