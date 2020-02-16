const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// models
const Course = require("../models/Courses");
const Assessment = require("../models/Assessments");

// cache

exports.create = (req, res) => {
    const { course, title, type, start, end, location, weight, score } = req.body;

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
                return callback(null, term[0].term);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const createAssessment = (term, callback) => {
        Assessment.create({
            _id: ObjectId(),
            term,
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

    async.waterfall([
        matchTerm,
        createAssessment
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

// WIP
exports.read = (req, res) => {
    const { termId } = req.params;
    const { current } = req.query;
    
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
                return assessment;
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

// WIP
exports.filter = (req, res) => {
    const { courseId } = req.params;
    const { current } = req.query;

    Assessment.find({ 
        course: courseId,
        "date.start": {
            filter: Date.now()
        } 
    }, {
        course: 1,
        title: 1,
        type: 1,
        date: 1,
        location: 1,
        meta: 1
    })
    .populate("course", [ "title" ])
    .sort({ "date.start": 1 })
    .then(assessments => {
        if(assessments.length === 0) {
            return res.status(404).json({
                message: "No assessments found"
            });
        } else {
            return res.status(200).json(assessments);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

exports.edit = (req, res) => {
    const { assessmentId } = req.params;

    const getAssessment = callback => {
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

    const fetchCourseOptions = (assessment, callback) => {
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
        getAssessment,
        fetchCourseOptions
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
    const { assessmentId } = req.params;
    const { course, title, type, start, end, location, weight, score, createdAt } = req.body;

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
                return callback(null, term[0].term);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const updateAssessment = (term, callback) => {
        Assessment.updateOne({ _id: assessmentId }, {
            $set: {
                term,
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
            }
        })
        .then(assessment => {
            if(!assessment) {
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

    async.waterfall([
        matchTerm,
        updateAssessment
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

    Assessment.deleteOne({ _id: assessmentId })
    .then(assessment => {
        if(!assessment) {
            return res.status(404).json({
                message: "Assessment not found"
            });
        } else {
            return res.status(200).json({
                message: err.message
            });
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};