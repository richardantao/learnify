// helper dependencies
const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;
const sgMail = require("@sendgrid/mail");

// import env variables
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const Bug = require("../models/Bugs");
const User = require("../models/User");

exports.create = (req, res) => {
    // const _id = req.user;
    const _id = ObjectId("5deb33a40039c4286179c4f1"); // testing
    const { where, type, message } = req.body;

    const fileBug = callback => {
        Bug.create({
            _id: ObjectId(),
            user: _id,
            where,
            type,
            message
        })
        .then(bug => {
            return callback(null, bug);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const pairBugToUser = (bug, callback) => {
        Bug.find({ _id: bug._id }, {
            _id: 1,
            user: 1,
            where: 1,
            type: 1,
            message: 1
        })
        .populate("user", [ "email.address" ])
        .then(report => {
            return callback(null, report);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        }); 
    };  

    const emailAdmin = (report, callback) => {
        sgMail.setApiKey(sendGridKey);
        return res.json(report);

        const mailOptions = {
            from: report.user,
            to: user,
            subject: "ATTENTION: New bug reported",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    Bug Id: ${report._id} \n
                    Reporter Id: ${report.user} \n
                    Reporter Email: ${report.user} \n
                    Where: ${report.where} \n
                    Type: ${report.type} \n
                    Message: ${report.message} \n
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
        return callback(null, mailOptions);
    };

    async.waterfall([
        fileBug,
        pairBugToUser,
        emailAdmin
    ], (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json({
                message: "Thank you for reporting this bug. We will be tending to this issue immediately"
            });
        };  
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

    Bug.find({ _id: bugId })
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
            return res.status(200).json({
                message: "Bug updated"
            });
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