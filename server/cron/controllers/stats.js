const async = require("async");
const moment = require("moment");

const sgMail = require("@sendgrid/mail");

const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

// models
const User = require("../../api/models/User");
const Year = require("../../api/models/Years");
const Term = require("../../api/models/Terms");
const Course = require("../../api/models/Courses");
const Class = require("../../api/models/Classes");
const Assessment = require("../../api/models/Assessments");
const Task = require("../../api/models/Tasks");
const Beta = require("../../api/models/Beta");
const Feedback = require("../../api/models/Feedback");
const Bug = require("../../api/models/Bugs");
const Blog = require("../../api/models/Blog");

/* Collection Stats */
exports.users = () => {
    User.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Users' Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Users collection: ${err}`)
    });
};

exports.years = () => {
    Year.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Years' Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Years collection: ${err}`)
    });
};

exports.terms = () => {
    Term.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Terms' Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Terms collection: ${err}`)
    });
};

exports.courses = () => {
    Course.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Courses' Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Courses collection: ${err}`)
    });
};

exports.classes = () => {
    Class.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Classes' Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Classes collection: ${err}`)
    });
};

exports.assessments = () => {
    Assessment.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Assessments' Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Assessments collection: ${err}`)
    });
};

exports.tasks = () => {
    Task.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Tasks's Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Tasks collection: ${err}`)
    });
};

exports.beta = () => {
    Beta.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Beta Users' Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Beta collection: ${err}`)
    });
};

exports.feedback = () => {
    Feedback.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Feedback Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Feedback collection: ${err}`)
    });
};

exports.bugs = () => {
    Bug.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Bugs' Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Bugs collection: ${err}`)
    });
};

exports.blog = () => {
    Blog.stats({ scale: 1024 })
    .then(stats => {
        sgMail.setApiKey(sendGridKey);

        const mailOptions = {
            from: user,
            to: user,
            subject: "Blog Collection Report",
            html: `<!DOCTYPE HTML>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <style>
                        
                    </style>
                </head>
                <body>
                        ${stats}
                </body>
            </html>
            `
        };

        sgMail.send(mailOptions);
    })
    .catch(err => {
        new Error(`Error retrieving stats on the Blog collection: ${err}`)
    });
};