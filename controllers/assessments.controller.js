const moment = require("moment");

const User = require("../models/User.model");

const controller = [];

controller.create = (req, res) => {
    const { _id } = req.user[0];
    
    User.updateOne({ _id }, {
        $push: {

        }
    })
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

controller.read = (req, res) => {
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
    });
};

controller.edit = (req, res) => {
    const { assessmentId } = req.params;

    User.find({ _id }, {
        
    })
    .limit(1)
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

controller.update = (req, res) => {
    const { assessmentId } = req.params;

    User.updateOne({  }, {
        $set: {
            
        }
    })
    .limit(1)
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

controller.delete = (req, res) => {
    const { assessmentId } = req.params;

    User.updateOne({  }, {
        $pull: {

        }
    })
    .limit(1)
    .then()
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

module.exports = controller;