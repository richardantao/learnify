require("dotenv").config();

const express = require("express");

const app = express();

// import env variables
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});

app.post("/invite", (req, res) => {
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
});



module.exports = app;