/* Major dependencies */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const async = require("async");
const moment = require("moment");
const { check, sanitize, validationResult } = require("express-validator");

/* Configurations */
const app = express();
const port = process.env.PORT || 3001;
const db = require("./config/db");

/* Environment variables */
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

/* Database schema */
const Schema = require("mongoose").Schema;
const model = require("mongoose").model;
const ObjectId = require("mongodb").ObjectID;

const BetaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    meta: {
        createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
    }
});

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/* Bootup */
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});

/* Routes */
app.post("/invite", (req, res) => {
    const { name, email } = req.body;
    const error = validationResult(req);
    const Beta = model("beta", BetaSchema);
    sgMail.setApiKey(sendGridKey);
    
    check(name, "Name had an invalid input")
        .exists().withMessage("Name is a required field")
        .isAlphanumeric().withMessage("Name must contain only letters and numbers");

    check(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");

    sanitize(name)
        .escape();
    sanitize(email)
        .escape()
        .normalizeEmail();
        
    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        async.parallel([
            callback => {
                Beta.create({
                    _id: ObjectId(),
                    name,
                    email
                })
                .then(beta => {
                    callback(null, null);
                })
                .catch(err => {
                    console.log(err);
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
                
                callback(null, null);
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
    
                callback(null, { message: `An email confirmation of your invite has been sent to ${email}` })
            }
        ], (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: err.message
                });
            } else {
                console.log(results);
                return res.status(201).json(results);
            };
        });
    };
});

app.post("/contact", (req, res) => {
    const { name, email, text } = req.body;
    
    sgMail.setApiKey(sendGridKey);

    check(name, "Name had an invalid input")
        .exists().withMessage("Name is a required field")
        .isLength().withMessage("Name must be at least 3 characters long")
        .isAlphanumeric().withMessage("Name must contain only numbers and letters");
    
    check(email, "Email received an invalid input")
        .exists().withMessage("Email is a required field")
        .isLength({ min: 5 }).withMessage("Email must contain at least 5 characters")
        .isEmail().withMessage("Email must be a valid email address");
    
    check(text, "Message received an invalid message")
        .exists().withMessage("Message is a required field")
        .isLength({ min: 10 }).withMessage("Message must contain at least 10 characters");

    sanitize(name).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(text).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
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
                            font-size: 3em;
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
            message: "Your message has been sent. You can expect a reply shortly"
        });
    };
});

module.exports = app;