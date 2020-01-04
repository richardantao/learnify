require("dotenv").config();

const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const sgMail = require("@sendgrid/mail");
const async = require("async");

const controller = [];

controller.invite = (req, res) => {
    const { name, email } = req.body;
    const Beta = require("../models/Beta");
    const ObjectId = require("mongodb").ObjectID;
    sgMail.setApiKey(sendGridKey);
    
    async.series([
        callback => {
            Beta.create({
                _id: ObjectId(),
                name,
                email
            })
            .then(beta => {
                callback(null, beta);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        }, 
        callback => {
            const adminMail = {
                from: email,
                to: user,
                subject: `${name} has signed up for the beta program!`,
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
                        ${name} has been added to the beta program
                    </body>
                </html>
                `
            };

            sgMail.send(adminMail);

            callback(null, adminMail);
        },
        callback => {
            const betaMail = {
                from: user,
                to: email,
                subject: "Welcome to Learnify's Beta Program!",
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <style>
                            h3 {
                                font-size: 2em;
                            }

                            p {
                                font-size: 1.5em;
                            }
                        </style>
                    </head>
                    <body>
                        <h3>Welcome to the Beta group!</h3>
                        <p>
                            Thank you for signing up for Learnify, 
                            a new platform dedicated to building the foundations for student success.
                        </p>
                        <hr>
                        <p>
                            You are currently in queue,
                            and will shortly receive an email regarding registration and the beta program.
                        </p>
                    </body>
                </html>
                `
            };

            sgMail.send(betaMail);

            callback(null, { message: `Your invite has been sent to ${email}` })
        }
    ], (err, results) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                message: err.message
            });
        } else {
            console.log(results[2]);
            return res.status(201).json(results[2]);
        };
    });
};

controller.contact = (req, res) => {
    const { name, email, text } = req.body;
    sgMail.setApiKey(sendGridKey);

    const mailOptions = {
        from: email,
        to: user,
        subject: `${name} has sent you a message`,
        html: `<!DOCTYPE HTML>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <style>
                    p {
                        font-size: 2em;
                    }
                </style>
            </head>
            <body>
                <p>
                    ${text}
                </p>
            </body>
        </html>
        `
    };

    sgMail.send(mailOptions);

    return res.status(200).json({
        message: "Your message has been sent"
    });
};

module.exports = controller;