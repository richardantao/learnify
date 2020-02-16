const async = require("async");
const moment = require("moment");

const Feedback = require("../models/Feedback");

exports.create = (req, res) => {
    const { } = req.body;

    Feedback.create({

    })
    .then(feedback => {
        return res.status(201).json(feedback);
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

exports.edit = (req, res) => {
    const { feedbackId } = req.params;
    
    Feedback.find({ _id: feedbackId })
    .limit(1)
    .then(feedback => {
        if(feedback.length === 0) {
            return res.status(404).json({
                message: "No feedback found"
            }); 
        } else {
            return res.status(200).json(feedback[0]);    
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};  

exports.update = (req, res) => {
    const { } = req.body;

    Feedback.updateOne({ }, {
        $set: {

        }
    })
    .then(feedback => {
        if(!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
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

exports.delete = (req, res) => {
    const { feedbackId } = req.params;
    
    Feedback.deleteOne({ _id: feedbackId })
    .then(feedback => {
        if(!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        } else {
            return res.status(200).json({ 
                message: "Feedback deleted" 
            });
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};