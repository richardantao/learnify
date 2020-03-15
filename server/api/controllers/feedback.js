// helpers
const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// logger
const logger = require("../../config/logger");

// model
const Feedback = require("../models/Feedback");

module.exports = (req, res) => {
    const { _id } = req.user;
    const { subject, description } = req.body;

    Feedback.create({
        _id: ObjectId(),
        user: _id,
        subject,
        description
    })
    .then(() => {
        return res.status(201).json({ message: "Thank you for submitting feedback!" });
    })
    .catch(err => {
        logger.error(err);
        return res.status(500).json({ message: err.message });
    }); 
};