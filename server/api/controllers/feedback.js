const async = require("async");
const moment = require("moment");

const redis = require("../../config/cache");
const Feedback = require("../models/Feedback");

exports.create = (req, res) => {
    const { } = req.body;

    const saveToDb = callback => {

    };

    const cacheResult = (feedback, callback) => {
        redis.setex(JSON.stringify(feedback._id), 3600, JSON.stringify(feedback));


    };

    async.waterfall([
        saveToDb,
        cacheResult
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
    // const _id = req.user;
    const _id = ObjectId("5deb33a40039c4286179c4f1"); // testing
    
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
        if(cacheResults.length > 0) {
            redis.setex(redisKey, 3600, JSON.stringify(cacheResults));

            const feedback = JSON.parse(cacheResults);

            return callback(null, feedback);
        } else {
            Feedback.find({ user: _id }, {
                _id: 1
            })
            .sort({ date: -1 })
            .then(feedback => {
                if(feedback.length === 0) {
                    return res.status(404).json({
                        message: "No feedback found"
                    });
                } else {
                    return res.status(200).json(feedback);
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

};

exports.update = (req, res) => {
    const { } = req.body;

};

exports.delete = (req, res) => {
    // const _id = req.user;
    const _id = ObjectId("5deb33a40039c4286179c4f1"); // testing
    const { feedbackId } = req.params;

    const clearCache = callback => {
        redis.del(JSON.stringify(feedbackId));
        redis.del();

        return callback(null);
    };

    const deleteFromDb = callback => {
        Feedback.deleteOne({})
        .then(feedback => {
            if(!feedback) {
                return res.status(404).json({
                    message: "Feedback not found"
                });
            } else {
                return callback(null, { message: "Feedback deleted" });
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    async.waterfall([
        clearCache,
        deleteFromDb
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