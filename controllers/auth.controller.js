// import dependencies
const express = require("express");
const app = express();

const async = require("async");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const OAuth2 = google.auth.OAuth2;

// import env variables
const user = process.env.AUTH_EMAIL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectToken = process.env.REDIRECT_URL;
const refreshToken = process.env.REFRESH_TOKEN;
const secret = process.env.AUTH_SECRET;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const oauth2Client = new OAuth2(
    clientId, 
    clientSecret,
    redirectToken
);

oauth2Client.setCredentials({
    refresh_token: refreshToken
});

const accessToken = oauth2Client.getAccessToken();

// import model
const User = require("../models/User.model");

// instantiate controller
const controller = [];

controller.user = (req, res) => {
    const { _id } = req.user;

    User.find({ _id }, {
        _id: 1,
        name: 1,
        "email.address": 1
    })
    .limit(1)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occured on the server while loading your user credentials"
        });
    });
};

controller.register = (req, res) => {
    var { first, last, email, password } = req.body;

    // grab user data from registration form body    
    const validateEmail = (callback) => {
        User.find({ "email.address": email }, {
            "email.address": 1
        })
        .limit(1)
        .then(user => {
            if(user.length > 0) {
                return res.status(400).json({
                    message: "This email is already associated with a registered account"
                });
            } else {
                console.log(email + " does not exist in the database")
                callback(null, email);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message || "The server experienced an error while validating your email"
            });
        });
    };

    // hash password from the form and pass form data to the database collection
    const hashPassword = (email, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash("", salt, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        message: "The server was unable to hash your password",
                        errors: err
                    });
                } else {
                    password = hash;
                    console.log("The user's hashed password is " + hash);
                    callback(null, email, hash);
                };
            });
        });
    };

    const registerUser = (email, hash, callback) => {
        User.create({
            name: {
                first,
                last
            },
            email: { 
                address: email
            },
            password: hash
        })
        .then(registeredUser => {
            console.log("New registered user: " + registeredUser)
            callback(null, registeredUser);
        })
        .catch(err => {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: err.messsage || "An error occured while registering your new account"
            });
        });
    };

    const sendVerificationEmail = (registeredUser, callback) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user, 
                clientId,
                clientSecret,
                refreshToken,
                accessToken
            }
        });

        const mailOptions = {
            from: user,
            to: registeredUser.email.address,
            subject: "Welcome to Learnify!",
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
                    <h3>This is a test email for an app I am developing.</h3> 
                    <p>
                        If you are receiving this email you are a friend I figured wouldn't mind being bugged by this.
                    </p>
                    <p>
                        This is what will become an email verification for users when they register an account with the application. Thanks for your time, have a great day.
                    </p>
                    <p>
                        Regards,
                    </p>
                    <p>
                        Rich <br> Founder <br> Learnify <br> <a href="https://learnify.ca">learnify.ca</a>
                    </p>
                </body>
            </html>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "The server was unable to send an email verification"
                });
            } else {
                console.log(mailOptions, info);
                transporter.close();
                callback(null, { message: "Account registered. Email verification sent to " + mailOptions.to + "."});
            };
        });
    };

    // run series of functions above
    async.waterfall([
        validateEmail, // check whether registered email is already in database
        hashPassword, // if not, hash the password
        registerUser, // save the new user to the database collection
        sendVerificationEmail // send verification token to email to verify the account
    ], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "The server was unable to complete your request",
                errors: err
            });
        } else {
            return res.status(201).json(results);
        };
    });
};

controller.signin = (req, res) => {
    var { email, password } = req.body;

    User.find({ "email.address": email }, {
        email: 1,
        password: 1
    })
    .limit(1)
    .then(user => {
        if(user.length === 0) { // if the email isn't found in the database
            return res.status(404).json({
                auth: false,
                message: "This email is not associated with a registered account"
            })
        } else if (user.length > 1 && user.email.address !== true) { // if the email is registered but hasn't been verified, send error message below
            return res.status(400).json({
                message: "This account hasn't been verified. Please check your email to verify the account before signing in"
            });
        } else { // compare password to the synced password of the email
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            } else {
                const token = jwt.sign(
                    { id: user._id }, 
                    secret, 
                    { expiresIn: 259200 } // expires in 72 hours
                );

                console.log({ auth: true, token, user });
                // res.status(200).json({
                //     auth: true, 
                //     token,
                //     user
                // });

                return res.redirect("301", "/dashboard");
            }
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occurred while processing your request"
        });
    });
};

// resets user's password
controller.forgot = (req, res) => {
    const { email } = req.body;

    User.find({ "email.address": email }, {
        "email.address": 1
    })
    .limit(1)
    .then(email => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user, 
                clientId,
                clientSecret,
                refreshToken,
                accessToken
            }
        });
    
        const mailOptions = {
            from: user,
            to: email,
            subject: "Reset Learnify password",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
    
                </body>
            </html>
            `
        };
    
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "The server was unable to send a reset link"
                });
            } else {
                console.log(mailOptions, info);
                transporter.close();
            };
        });
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || ""
        });
    }); 
};

controller.signout = (req, res, next) => {
    return res.status(200).json({
        auth: false,
        message: "You have successfully logged out",
        token: null
    });  

    // return res.redirect(301, "/");
};

module.exports = controller;