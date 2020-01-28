const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

const redis = require("../../config/cache");
const Bug = require("../models/Bugs");

exports.create = (req, res) => {
    // const _id = req.user;
    const _id = ObjectId("5deb33a40039c4286179c4f1"); // testing
    const { where, type, message } = req.body;

    Bug.create({
        _id: ObjectId(),
        user: _id,
        where,
        type,
        message
    })
    .then(bug => {
        return res.status(201).json(bug);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

exports.read = (req, res) => {
    // const _id = req.user;
    const _id = ObjectId("5deb33a40039c4286179c4f1"); // testing

    Bug.find({ user: _id })
    .sort({ "updatedAt": -1 })
    .then(bugs => {
        if(bugs.length === 0) {
            return res.status(404).json({
                message: "No bugs found"
            });
        } else {
            return res.status(200).json(bugs);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

exports.edit = (req, res) => {
    const { bugId } = req.params;

    Bug.find({ _id: bugId }, {
        _id: 1
    })
    .limit(1)
    .then(bug => {
        if(bug.length === 0) {
            return res.status(404).json({
                message: "No bug found"
            });
        } else {
            return res.status(200).json(bug[0]);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

exports.update = (req, res) => {
    // const _id = req.user;
    const _id = ObjectId("5deb33a40039c4286179c4f1"); // testing
    const { bugId } = req.params;
    const { where, type, message, resolved } = req.body;

    const update = {
        where,
        type,
        message,
        updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm"),
        resolved
    };  

    Bug.updateOne({ _id: bugId }, {
        $set: update
    })
    .then(bug => {
        if(!bug) {
            return res.status(404).json({
                message: "No bug found"
            });
        } else {
            return res.status(200).json(bug);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

exports.delete = (req, res) => {
    const { bugId } = req.params;

    Bug.deleteOne({ _id: bugId })
    .then(bug => {
        if(!bug) {
            return res.status(404).json({
                message: "Bug not found"
            });
        } else {
            return res.status(200).json({
                message: "Bug deleted"
            });
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};