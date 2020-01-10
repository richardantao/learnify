require("dotenv").config();

const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const crypto = require("crypto");
const moment = require("moment");

const sgMail = require('@sendgrid/mail');
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const Year = require("./Years");

const UserSchema = new Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    email: {
        address: { type: String, required: true, unique: true},
        token: { type: String, default: crypto.randomBytes(16).toString("hex") },
        verified: { type: Boolean, default: false }
    },
    password: {
        hash: { type: String, required: true, minlength: 6 },
        token: { type: String, default: crypto.randomBytes(16).toString("hex") }
    },
    location: {
    	country: String,
        region: String,
        institution: { type: String, enum: [ "University", "College", "High School", "Middle School" ] },
        school: String
    },
    preferences: {
        startDay: { type: String, enum: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ] },
        startTime: { type: String, default: "8:00am"},
        defaultDuration: { type: Number, default: 50, min: [ 0, "Default duration must be greater than 0" ] },
        defaultCalendar: { type: String, default: "Week", enum: [ "Month", "Week", "Day", "Agenda" ] },
        onEmailList: { type: Boolean, default: true}
    },
    meta: {
        membership: { type: String, default: "Basic", enum: ["Admin", "Basic", "Beta", "Premium"] },
        sessions: { type: Number, default: 0, min: 0 },
        lastActiveAt: { type: Date, default: null },
        createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
        updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
});

UserSchema.post("findByIdAndDelete", document => {
    const id = document._id;
    
    Year.find({ user: id }, {
        _id: 1
    })
    .then(years => {
        years.map(year => {
            Year.findOneAndDelete({ _id: year._id })
        });
    })
    .catch(err => {
        sgMail.setApiKey(sendGridKey);
        
        const mailOptions = {
            from: user,
            to: user,
            subject: "Cascade Error: Deleting User children",
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
                    <p>	
                        ${err.message}
                    </p>
                </body>
            </html>
            `
        };
        
        sgMail.send(mailOptions);
    });
});

module.exports = model("users", UserSchema);