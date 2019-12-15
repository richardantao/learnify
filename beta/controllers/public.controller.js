// import dependencies
const dotenv = require("dotenv").config();

// import env variables
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

// instantiate controller functions
const controller = [];

controller.application = (req, res) => {
    const { email } = req.body;

    sgMail.setApiKey(sendGridKey);

    const mailOptions = {
        from: email,
        to: user,
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
                
            </body>
        </html>
        `
    };

    sgMail.send(mailOptions);

    return res.status(200).json({
        message: ""
    });
};

controller.contact = (req, res) => {
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
                    h3 {
                        font-size: 2em;
                    }

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
};

controller.invite = (req, res) => {
    const { email, name } = req.body;

    sgMail.setApiKey(sendGridKey);

    const adminMail = {
        from: email,
        to: user,
        subject: `${name} has signed up for the beta program!`,
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

    return res.status(200).json({
        message: `An email confirmation of your invite has been sent to ${email}` 
    });
};

module.exports = controller;