const moment = require("moment");

const User = require("../models/User");

exports.create = (req, res) => {
    const { _id } = req.user[0];

    User.updateOne({ _id}, {
        $push: {

        }
    })
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    })
};

exports.read = (req, res) => {
    const { _id } = req.user[0];
    
    User.find({ _id }, {
        "": 1
    })
    .sort()
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    })
};

exports.edit = (req, res) => {
    const { classId } = req.params;

    User.find({  }, { 
        "": 1
    })
    .limit(1)
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

exports.update = (req, res) => {
    const { classId } = req.params;

    User.updateOne({  }, { 
        $set: {

        }
    })
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    })

};

exports.delete = (req, res) => {
    const { classId } = req.params;

    User.updateOne({  }, { 
        $pull: {

        }
    })
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};