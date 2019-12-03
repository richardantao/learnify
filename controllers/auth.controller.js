const async = require("async");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');

// import env variables
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;
const secret = process.env.JWT_SECRET;

// import model
const User = require("../models/User.model");

// instantiate controller
const controller = [];

controller.user = (req, res) => {
    const { _id } = req.user;

    User.find({ _id }, {
        _id: 1,
        name: 1,
        "email.address": 1,
        "meta.membership": 1
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
        sgMail.setApiKey(sendGridKey);
        
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

        sgMail.send(mailOptions);

        callback(null, { message: "Account registered. Email verification send to " + mailOptions.to + "." });
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
    // deconstruct submission from login form
    var { email, password } = req.body;

    User.find({ "email.address": email }, {
        email: 1,
        password: 1
    })
    .limit(1)
    .then(user => {
        if(user.length === 0) { // if the email isn't found in the database
            return res.status(404).json({
                message: "This email is not associated with a registered account"
            }); // this function will get caught by the else if below until email verification is implemented
        } else if (user.length > 0 && user[0].email.verified !== true) { // if the email is registered but hasn't been verified
            return res.status(400).json({
                message: "This account hasn't been verified. Please check your email to verify the account before signing in"
            });
        } else { // compare password to the synced password of the email
            const passwordIsValid = bcrypt.compareSync(password, user[0].password); // diagnose compareSync error
            if (!passwordIsValid) {
                return res.status(401).json({ 
                    message: "Wrong password. Try again or click Forgot Password to reset it."
                });
            } else {
                const token = jwt.sign(
                    { id: user[0]._id }, 
                    secret, 
                    { expiresIn: 259200 } // expires in 72 hours
                );

                console.log({ token, user });
                return res.status(200).json({
                    token,
                    user
                });
            };
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

    // return res.redirect(301, "https://learnify.ca");
};

module.exports = controller;