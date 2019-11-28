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
const path = require("path");

// import env variables
const user = process.env.EMAIL_AUTH_EMAIL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectToken = process.env.REDIRECT_URL;
const refreshToken = process.env.REFRESH_TOKEN;
const secret = process.env.AUTH_SECRET;

// middleware
const auth = require("../middleware/auth.middleware");
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

// const accessToken = oauth2Client.getAccessToken();

// import model
const User = require("../models/User.model").Model;

// instantiate controller
const controller = [];

controller.user = (req, res) => {
    User.findById(req.user.id)
    .select("-password")
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occured on the server while loading your user credentials"
        });
    });
};

controller.application = (req, res) => {
     const transporter = nodemailer.createTransport({
         host: "Gmail",
         port: 587,
         auth: {
             type: "OAuth2",
             user, 
             clientId,
             clientSecret,
             refreshToken//,
             // accessToken: accessToken
         }
     });
            
    const mailOptions = {
        from: req.body.fname + " " + req.body.lname + " <" + req.body.email +">",
        to: authEmail,
        attachments: [
            {
                path: ABSPATH + ""
            }
        ]
    };
            
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            throw err;
        } else {
            console.log("Email sent: " + info.response);
        };
    })
    .then(info => {
        return res.status(200).json(info);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "The server experienced an erorr while processing your request"
        });
    });
};

controller.contact = (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "Gmail",
        port: 587,
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
        from: "<" + req.body.email + ">",
        to: user,
        subject: req.body.name + " has sent you a message!",
        text: req.body.message
    };
            
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            throw err;
        } else {
            console.log("Email sent: " + info.response);
        };
        transporter.close();
    })
    .then(info => {
        return res.status(200).json(info);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "The server experienced an erorr while processing your request"
        });
    });
};

controller.invite = (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "Gmail",
        port: 587,
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
        from: "<" + req.body.email + ">",
        to: user,
        subject: req.body.fname + " " + req.body.lname + " has requested an invite to Tutee's beta test!",
        text: "Your database should be populated with this user's information." 
    };
            
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            throw err;
        } else {
            console.log("Email sent: " + info.response);
        };
        transporter.close();
    })
    .then(info => {
        return res.status(200).json(info);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "The server experienced an erorr while processing your request"
        });
    });
};

controller.register = (req, res) => {
    const { fname, lname, email, password } = req.body;

    // grab user data from registration form body    
    const validateEmail = (callback) => {
        User.findOne({ "email.address": email})
        .then(user => {
            if(user !== null) {
                return res.status(400).json({
                    error: "This is email is already associated with a registered account"
                });
            } else {
                callback(null, email);
            };
        })
        .catch(err => {
            return res.status(500).json({
                errors: err.message || "The server experienced an error while validating this email"
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

                    callback(null, email, hash);
                };
            });
        });
    };

    const registerUser = (email, hash, callback) => {
        // create user instance from form data and hashed password
        const newUser = new User({    
            name: {
                first: fname,
                last: lname
            },
            email: { 
                address: email
            },
            password: hash
        });

        // save user to database collection and pass user info to next function
        newUser.save()
        .then(registeredUser => {
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
            host: "Gmail",
            port: 587,
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
            from: "",
            to: registeredUser.email.address,
            subject: "Welcome to Tutee!",
            html: ""
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                return res.status(500).json({
                    message: "The server was unable to send an email verification"
                });
            } else {
                console.log(info);
            };
        })
        .then(emailConfirmation => {
            callback(null, emailConfirmation);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message || "The server experienced an error while processing your request"
            });
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
    const { email, password } = req.body;

    User.findOne({ "email.address": email })
    .then(user => {
        if(!user) {
            return res.status(404).json({
                auth: false,
                message: "This email is not associated with a registered account"
            })
        } else {
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            const token = jwt.sign(
                { id: user._id }, 
                secret, 
                { expiresIn: 259200 } // expires in 72 hours
            );

            console.log({
                auth: true,
                token,
                user
            });
            // res.status(200).json({
            //     auth: true, 
            //     token,
            //     user
            // });

            return res.redirect("301", "/dashboard");
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occurred while processing your request"
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