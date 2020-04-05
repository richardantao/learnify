// helper dependencies
const async = require("async");
const moment = require("moment");
const { ObjectId } = require("mongodb");
const sgMail = require("@sendgrid/mail");

// import env variables
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const Bug = require("../models/Bugs");
const User = require("../models/User");

exports.submit = (req, res) => {
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
            return res.status(500).json({ message: err.message });
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
            return res.status(500).json({ message: err.message });
        }); 
    };  

    const emailAdmin = (report, callback) => {
        sgMail.setApiKey(sendGridKey);

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
        return callback(
            null, { 
            message: "Thank you for reporting this bug. We will be tending to this issue immediately"
        });
    };

    async.waterfall([
        fileBug,
        pairBugToUser,
        emailAdmin
    ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(201).json(results);
        };  
    });
};