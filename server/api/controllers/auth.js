require("dotenv").config();
const async = require("async");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');

// import env variables
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;
const secret = process.env.JWT_SECRET;

// import model
const User = require("../models/User");

exports.user = (req, res) => {
    // const { _id } = req.user[0];

    // User.find({ _id }, {
    //     _id: 1,
    //     name: 1,
    //     "email.address": 1,
    //     "meta.membership": 1
    // })
    // .limit(1)
    // .then(user => {
    //     res.status(200).json(user);
    // })
    // .catch(err => {
    //     return res.status(500).json({
    //         message: err.message
    //     });
    // });
};

exports.register = (req, res) => {
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
                return callback(null, email);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
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
                    return callback(null, email, hash);
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
            password: {
                hash
            }
        })
        .then(registeredUser => {
            console.log("New registered user: " + registeredUser)
            return callback(null, registeredUser);
        })
        .catch(err => {
            console.log(err);

            return res.status(500).json({
                message: err.messsage
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
                        <a href="https://app.learnify.ca/verifyEmail/${registeredUser.email.token}">Verify Email</a>
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);

        return callback(null, { message: "Account registered. Email verification send to " + mailOptions.to + "." });
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
                message: err.message
            });
        } else {
            return res.status(201).json(results);
        };
    });
};

exports.signin = (req, res) => {
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
            const passwordIsValid = bcrypt.compareSync(password, user[0].password.hash); // diagnose compareSync error
            if (!passwordIsValid) {
                return res.status(401).json({ 
                    message: "Wrong password. Try again or click Forgot Password to reset it."
                });
            } else {
                User.findOneandUpdate({ _id: user._id }, {
                    $set: {
                        meta: {
                            sessions: {
                                $inc: 1
                            }
                        }
                    }
                });

                const token = jwt.sign(
                    { id: user._id }, 
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
            message: err.message
        });
    });
};

// Set user's account to email verified
exports.verifyEmail = (req, res) => {
    const checkToken = (callback) => {
        const { token } = req.params;

        User.find({ "email.token": token }, {
            "email.token": 1
        })
        .limit(1)
        .then(matchedToken => {
            if(matchedToken.length === 0) {
                return res.status(404).json({
                    message: "We were unable to find a valid token. Your token my have expired."
                });
            } else {
                return callback(null, matchedToken);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const setToVerified = (matchedToken, callback) => {
        User.findOneandUpdate({ "email.token": matchedToken }, {
            $set: {
                email: {
                    verified: true
                }
            }
        })
        .then(() => {
            return callback(null, { message: "Your account has been verified. Please login." })
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    async.waterfall([
        checkToken,
        setToVerified
    ], (err, message) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(200).json(message);
        };
    });
};

exports.resendEmailVerification = (req, res) => {
    // grab email from form 
    const { email } = req.body;

    // generate new token
    const newToken = crypto.randomBytes(16).toString("hex");

    // set the new token for the user with the requested email
    User.findOneandUpdate({ "email.address": email }, {
        $set: {
            email: {
                token: newToken
            }
        }
    })
    .then(updatedUser => { 
        if(updatedUser.length === 0) { // if no user is found
            return res.status(404).json({
                message: "Email not found. Please input the email that requires the new token."
            }); 
        } else {
            const mailOptions = {
                from: user,
                to: updatedUser.email.address,
                subject: "Verify your account",
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
                        <a href="https://app.learnify.ca/verifyEmail/${newToken}">Verify Email</a>
                    </body>
                </html>
                `
            };
    
            sgMail.send(mailOptions);
    
            return res.status(200).json({
                message: "A new token for email verification has been sent to " + mailOptions.to + "."
            });
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    }); 
};

// resets user's password
exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.find({ "email.address": email }, {
        "email.address": 1
    })
    .limit(1)
    .then(emailRecipient => {
        if(emailRecipient.length === 0) {
            return res.status(404).json({
                message: "Email not found. Please try again."
            });
        } else {
            const token = crypto.randomBytes(16).toString("hex");

            const mailOptions = {
                from: user,
                to: emailRecipient[0].email.address,
                subject: "Reset your Learnify Password",
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
                            You are receiving this email because you requested to reset the password for your account.\n
                            Please click on this link to reset your password: <a href="https://app.learnify.ca/resetPassword/${token}">Reset Password</a>\n
                            If you did not request to reset your password, please ignore this email and your password will remain unchanged.
                    </body>
                </html>
                `
            };
            
            sgMail.send(mailOptions);

            return res.status(200).json({
                message: "A link to reset your password has been sent to " + mailOptions.to + "."
            });
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    }); 
};

exports.changePassword = (req, res) => {
    const { token } = req.params;

    User.find({ "password.token": token }, {
        "password.token": 1
    })
    .limit(1)
    .then(matchedToken => {
        if(matchedToken.length === 0) { // no token match
            return res.status(404).json({
                message: "Token not found. Please reset password again."
            });
        } else {
            return res.status(200).json({
                message: "Token successfully activated. Please set your new password."
            });
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        })
    })
};

exports.resetPassword = (req, res) => {
    const { password, confirm, token } = req.body; 

    if(password !== confirm) {
        return res.status(400).json({
            message: "The password fields do not match. Please try again."
        });
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash("", salt, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else {
                    User.findOneandUpdate({ "password.token": token }, {
                        $set: {
                            password: {
                                hash
                            }
                        }
                    })
                    .then(() => {
                        return res.status(200).json({
                            message: "Your password has been successfully updated. Please login."
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: err.message
                        });
                    });
                };
            });
        });
    };
};

exports.signout = (req, res) => {
    return res.status(200).json({
        message: "You have successfully logged out",
        token: null
    });  
};