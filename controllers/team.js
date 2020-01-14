const async = require("async");
const sgMail = require("@sendgrid/mail");
const user = process.env.AUTH_EMAIL;

const sendGridKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendGridKey);

// model and schema
const Applicant = require("../models/Applicant");
const ObjectId = require("mongodb").ObjectId;

exports.backend = (req, res) => {
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;
    const type = "Backend Node Developer";

    async.series({
        database: callback => {
            Applicant.create({
                _id: ObjectId(),
                first,
                last,
                email,
                city,
                type,
                strategy,
                help,
                importance,
                resume,
                portfolio,
                linkedin,
                other
            })
            .then(applicant => {
                console.log(applicant);
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        },
        notification: callback => {
            const mailOptions = {
                from: email,
                to: user,
                subject: "",
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <p>${first} ${last} has applied for the ${type} position.</p>
                    </body>
                </html>
                `
            };

            sgMail.send(mailOptions);
            callback(null, mailOptions);
        },  
        receipt: callback => {
            const mailOptions = {
                from: user,
                to: email,
                subject: `Thank you for applying for the ${type} position!`,
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <style>
                            h1 {
                                font-size: 2rem;
                            }
                            
                            div, p {
                                font-size: 1.25rem;
                            }

                            .question {
                                color: #00B300;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Your Application Receipt:</h1>
                        <section>
                            <div>
                                First Name: ${first}
                            </div>
                            <div>
                                Last Name: ${last}
                            </div>
                            <div>
                                Email: ${email}
                            </div>
                            <div>
                                City: ${city}
                            </div>
                        </section>
                        <section>
                            <div>
                                <p class="question">
                                    You've been told that the SDLC of your team's backend is becoming messy 
                                    and inefficient. Briefly discuss a strategy you would suggest to improve 
                                    the efficiency of the release cycle.
                                </p>
                                <p>
                                    ${strategy}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    Recall a recent event where you went out of your way to help someone else. 
                                    Include details about how you went about it, why you did it, and what difference 
                                    your actions made.
                                </p>
                                <p>
                                    ${help}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    What are three things that are most important to you in a work setting?
                                </p>
                                <p>
                                    ${importance}
                                </p>
                            </div>                            
                        </section>
                        <section>
                            <div>
                               Resume: ${resume}
                            </div>
                            <div>
                                Github: ${portfolio}
                            </div>
                            <div>
                                LinkedIn: ${linkedin}
                            </div>
                            <div>
                                Other: ${other}
                            </div>
                        </section>
                        <hr>
                        <section>
                            Thanks again for applying! Your application will be reviewed shortly.
                        </section>
                    </body>
                </html>
                `
            };
            console.log(mailOptions);
            sgMail.send(mailOptions);

            callback(null, { message: "Your application has been submitted" });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            console.log(results);
            return res.status(201).json(results[2]);
        };
    });
};

exports.creator = (req, res) => {
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;
    const type = "Content Creator";

    async.series({
        database: callback => {
            Applicant.create({
                _id: ObjectId(),
                first,
                last,
                email,
                city,
                type,
                strategy,
                help,
                importance,
                resume,
                portfolio,
                linkedin,
                other
            })
            .then(applicant => {
                console.log(applicant);
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        },
        notification: callback => {
            const mailOptions = {
                from: email,
                to: user,
                subject: "",
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <p>${first} ${last} has applied for the ${type} position.</p>
                    </body>
                </html>
                `
            };

            sgMail.send(mailOptions);
            callback(null, mailOptions);
        },  
        receipt: callback => {
            const mailOptions = {
                from: user,
                to: email,
                subject: `Thank you for applying for the ${type} position`,
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <style>
                            h1 {
                                font-size: 2rem;
                            }
    
                            p {
                                font-size: 1.25rem;
                            }
    
                            .question {
                                color: #E1E1E1;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Your Application Receipt:</h1>
                        <section>
                            <div>
                                First Name: ${first}
                            </div>
                            <div>
                                Last Name: ${last}
                            </div>
                            <div>
                                Email: ${email}
                            </div>
                            <div>
                                City: ${city}
                            </div>
                        </section>
                        <section>
                            <div>
                                <p class="question">
                                    You have just published your content. How do you promote it?
                                </p>
                                <p>
                                    ${strategy}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    Recall a recent event where you went out of your way to help someone else. 
                                    Include details about how you went about it, why you did it, and what difference 
                                    your actions made.
                                </p>
                                <p>
                                    ${help}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    What are three things that are most important to you in a work setting?
                                </p>
                                <p>
                                    ${importance}
                                </p>
                            </div>                            
                        </section>
                        <section>
                            <div>
                               Resume: <a href="${resume}" target="_blank" rel="noopener noreferrer>${resume}</a>
                            </div>
                            <div>
                                Github: <a href="${portfolio}" target="_blank" rel="noopener noreferrer>${portfolio}</a>
                            </div>
                            <div>
                                LinkedIn: <a href="${linkedin}" target="_blank" rel="noopener noreferrer">${linkedin}</a>
                            </div>
                            <div>
                                Other: <a href="${other}" target="_blank" rel="noopener noreferrer>${other}</a>
                            </div>
                        </section>
                        <hr>
                        <section>
                            Thanks again for applying! Your application will be reviewed shortly.
                        </section>
                    </body>
                </html>
                `
            };
    
            console.log(mailOptions);
            sgMail.send(mailOptions);
    
            callback(null, { message: "Your application has been submitted" });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            })
        } else {
            return res.status(201).json(results[2]);
        };
    });
};

exports.designer = (req, res) => {
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;
    const type = "Visual Designer";

    async.series({
        database: callback => {
            Applicant.create({
                _id: ObjectId(),
                first,
                last,
                email,
                city,
                type,
                strategy,
                help,
                importance,
                resume,
                portfolio,
                linkedin,
                other
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        },
        notification: callback => {
            const mailOptions = {
                from: email,
                to: user,
                subject: "",
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <p>${first} ${last} has applied for the ${type} position.</p>
                    </body>
                </html>
                `
            };

            sgMail.send(mailOptions);
            callback(null, mailOptions);
        },   
        receipt: callback => {
            const mailOptions = {
                from: user,
                to: email,
                subject: `Thank you for applying for the ${type} position`,
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <style>
                            h1 {
                                font-size: 2rem;
                            }

                            p {
                                font-size: 1.25rem;
                            }

                            .question {
                                color: #E1E1E1;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Your Application Receipt:</h1>
                        <section>
                            <div>
                                First Name: ${first}
                            </div>
                            <div>
                                Last Name: ${last}
                            </div>
                            <div>
                                Email: ${email}
                            </div>
                            <div>
                                City: ${city}
                            </div>
                        </section>
                        <section>
                            <div>
                                <p class="question">
                                    How would you determine a good user experience for your target user?
                                </p>
                                <p>
                                    ${strategy}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    Recall a recent event where you went out of your way to help someone else. 
                                    Include details about how you went about it, why you did it, and what difference 
                                    your actions made.
                                </p>
                                <p>
                                    ${help}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    What are three things that are most important to you in a work setting?
                                </p>
                                <p>
                                    ${importance}
                                </p>
                            </div>                            
                        </section>
                        <section>
                            <div>
                               Resume: <a href="${resume}" target="_blank" rel="noopener noreferrer>${resume}</a>
                            </div>
                            <div>
                                Github: <a href="${portfolio}" target="_blank" rel="noopener noreferrer>${portfolio}</a>
                            </div>
                            <div>
                                LinkedIn: <a href="${linkedin}" target="_blank" rel="noopener noreferrer">${linkedin}</a>
                            </div>
                            <div>
                                Other: <a href="${other}" target="_blank" rel="noopener noreferrer>${other}</a>
                            </div>
                        </section>
                        <hr>
                        <section>
                            Thanks again for applying! Your application will be reviewed shortly.
                        </section>
                    </body>
                </html>
                `
            };

            sgMail.send(mailOptions);

            callback(null, { message: "Your application has been submitted" });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json(results[2]);
        };
    });
};

exports.frontend = (req, res) => {
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;
    
    async.series({        
        database: callback => {
            Applicant.create({
                _id: ObjectId(),
                first,
                last,
                email,
                city,
                type: "Frontend React Developer",
                strategy,
                help,
                importance,
                resume,
                portfolio,
                linkedin,
                other
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        },
        notification: callback => {
            const mailOptions = {
                from: email,
                to: user,
                subject: "",
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <p>${first} ${last} has applied for the ${type} position.</p>
                    </body>
                </html>
                `
            };

            sgMail.send(mailOptions);
            callback(null, mailOptions);
        },  
        receipt: callback => {
            const mailOptions = {
                from: user,
                to: email,
                subject: `Thank you for applying for the ${type} position`,
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <style>
                            h1 {
                                font-size: 2rem;
                            }

                            p {
                                font-size: 1.25rem;
                            }

                            .question {
                                color: #E1E1E1;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Your Application Receipt:</h1>
                        <section>
                            <div>
                                First Name: ${first}
                            </div>
                            <div>
                                Last Name: ${last}
                            </div>
                            <div>
                                Email: ${email}
                            </div>
                            <div>
                                City: ${city}
                            </div>
                        </section>
                        <section>
                            <div>
                                <p class="question">
                                    You've noticed that the client–side performance of your app has diminished as 
                                    the app has scaled; Discuss your strategy to improve the performance of the app.
                                </p>
                                <p>
                                    ${strategy}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    Recall a recent event where you went out of your way to help someone else. 
                                    Include details about how you went about it, why you did it, and what difference 
                                    your actions made.
                                </p>
                                <p>
                                    ${help}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    What are three things that are most important to you in a work setting?
                                </p>
                                <p>
                                    ${importance}
                                </p>
                            </div>                            
                        </section>
                        <section>
                            <div>
                               Resume: <a href="${resume}" target="_blank" rel="noopener noreferrer>${resume}</a>
                            </div>
                            <div>
                                Github: <a href="${portfolio}" target="_blank" rel="noopener noreferrer>${portfolio}</a>
                            </div>
                            <div>
                                LinkedIn: <a href="${linkedin}" target="_blank" rel="noopener noreferrer">${linkedin}</a>
                            </div>
                            <div>
                                Other: <a href="${other}" target="_blank" rel="noopener noreferrer>${other}</a>
                            </div>
                        </section>
                        <hr>
                        <section>
                            Thanks again for applying! Your application will be reviewed shortly.
                        </section>
                    </body>
                </html>
                `
            };

            sgMail.send(mailOptions);

            callback(null, { message: "Your application has been submitted" });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json(results[2]);
        };
    });
};

exports.marketer = (req, res) => {
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;
    const type = "Marketing Specialist"

    async.series({
        database: callback => {
            Applicant.create({
                _id: ObjectId(),
                first,
                last,
                email,
                city,
                type,
                strategy,
                help,
                importance,
                resume,
                portfolio,
                linkedin,
                other
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        },
        notification: callback => {
            const mailOptions = {
                from: email,
                to: user,
                subject: "",
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <p>${first} ${last} has applied for the ${type} position.</p>
                    </body>
                </html>
                `
            };

            sgMail.send(mailOptions);
            callback(null, mailOptions);
        },  
        receipt: callback => {
            const mailOptions = {
                from: user,
                to: email,
                subject: `Thank you for applying for the ${type} position`,
                html: `<!DOCTYPE HTML>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <style>
                            h1 {
                                font-size: 2rem;
                            }

                            p {
                                font-size: 1.25rem;
                            }

                            .question {
                                color: #E1E1E1;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Your Application Receipt:</h1>
                        <section>
                            <div>
                                First Name: ${first}
                            </div>
                            <div>
                                Last Name: ${last}
                            </div>
                            <div>
                                Email: ${email}
                            </div>
                            <div>
                                City: ${city}
                            </div>
                        </section>
                        <section>
                            <div>
                                <p class="question">
                                    How would you determine your target market?
                                </p>
                                <p>
                                    ${strategy}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    Recall a recent event where you went out of your way to help someone else. 
                                    Include details about how you went about it, why you did it, and what difference 
                                    your actions made.
                                </p>
                                <p>
                                    ${help}
                                </p>
                            </div>
                            <div>
                                <p class="question">
                                    What are three things that are most important to you in a work setting?
                                </p>
                                <p>
                                    ${importance}
                                </p>
                            </div>                            
                        </section>
                        <section>
                            <div>
                               Resume: <a href="${resume}" target="_blank" rel="noopener noreferrer>${resume}</a>
                            </div>
                            <div>
                                Github: <a href="${portfolio}" target="_blank" rel="noopener noreferrer>${portfolio}</a>
                            </div>
                            <div>
                                LinkedIn: <a href="${linkedin}" target="_blank" rel="noopener noreferrer">${linkedin}</a>
                            </div>
                            <div>
                                Other: <a href="${other}" target="_blank" rel="noopener noreferrer>${other}</a>
                            </div>
                        </section>
                        <hr>
                        <section>
                            Thanks again for applying! Your application will be reviewed shortly.
                        </section>
                    </body>
                </html>
                `
            };

            sgMail.send(mailOptions);

            callback(null, { message: "Your application has been submitted" });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json(results[2]);
        };
    });
};