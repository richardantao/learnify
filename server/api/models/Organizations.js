const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const sgMail = require('@sendgrid/mail');
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const Group = require("./Groups.model");

const OrganizationSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    type: { type: String, required: true },
    verified: { type: Boolean, default: false },
    meta: {
        createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
    }
}, {
    versionKey: false
});

OrganizationSchema.post("deleteOne", document => {
    const organizationId = document._id;

    Group.find({ organization: organizationId }, {
        _id: 1
    })
    .then(groups => {
        groups.map(group => {
            Group.findOneAndDelete({ _id: group._id});
        });
    })
    .catch(err => {
        sgMail.setApiKey(sendGridKey);
        
        const mailOptions = {
            from: user,
            to: user,
            subject: "Cascade Error: Deleting Organization's children",
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

module.exports = model("organizations", OrganizationSchema);

