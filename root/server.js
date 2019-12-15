require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const port = process.env.PORT || 3001;
const db = require("./config/db");

// database //
const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;

const BetaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    meta: {
        createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
    }
});
// //

// import env variables
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});

app.post("/invite", (req, res) => {
    const { name, email} = req.body;
    const Beta = model("beta", BetaSchema);
    sgMail.setApiKey(sendGridKey);
    
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
                        
                    </body>
                </html>
                `
            };
        
            sgMail.send(adminMail, betaMail);

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
        }
    });
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    
    sgMail.setApiKey(sendGridKey);

    const mailOptions = {
        from: email,
        to: user,
        subject: `${name} has sent you a message through Learnify's contact form`,
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
                ${message}
            </body>
        </html>
        `
    };

    sgMail.send(mailOptions);

    return res.status(200).json({
        message: "Your message has been sent to the admin. You can expect a reply shortly"
    });
});

module.exports = app;