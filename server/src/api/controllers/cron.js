const async = require("async");

const sgMail = require('@sendgrid/mail');

const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

// models
const Term = require("../models/Terms");
const Assessment = require("../models/Assessments");
const User = require("../models/User");

// initialize controller
const cron = [];

// check if the term keys has any redundant elements
cron.cleanItems = (req, res) => {
    Assessment.find({
        _id: 1,
        term: 1,
        course: 1
    })
    .populate("course", [ "credit" ])
    .then(assessments => {
        for(let i = 0; assessments.length; i++) {
            if(assessments[i].course.credit < 1 && assessments[i].term.length > 1) {
                // compare date of assessment to terms, and remove term that assessment isn't inside
                
            } else {
                continue;
            };
        }; 
    })
    .catch(err => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Cron job error: cleanItems",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        p {
                            font-size: 1.5em;
                        }
                    </style>
                </head>
                <body>
                        ${err.message}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    });
};

module.exports = cron;