// import dependencies
const express = require("express");
const app = express();

const dotenv = require("dotenv").config();
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const OAuth2 = google.auth.OAuth2;

// import env variables
const user = process.env.EMAIL_AUTH_EMAIL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectToken = process.env.REDIRECT_URL;
const refreshToken = process.env.REFRESH_TOKEN;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// OAuth2
const oauth2Client = new OAuth2(
    clientId, 
    clientSecret,
    redirectToken
);

oauth2Client.setCredentials({
    refresh_token: refreshToken
});

// get access token
const accessToken = oauth2Client.getAccessToken();

// instantiate controller functions
const controller = [];

controller.application = (req, res) => {
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
       from: "<" + req.body.email + ">",
       to: user,
       subject: req.body.fname + " " + req.body.lname + " has requested an invite to Learnify's beta test!",
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

module.exports = controller;