const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const sgMail = require('@sendgrid/mail');
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const Term = require("./Terms");

const YearSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: "users" },
	title: { type: String, required: true },
	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true }
	},
	meta: {
		createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
});

YearSchema.post("deleteOne", document => {
	const yearId = document._id;

	Term.find({ year: yearId }, {
		_id: 1
	})
	.then(terms => {
		terms.map(term => {
			Term.findOneAndDelete({ _id: term._id });
		});
	})
	.catch(err => {
		sgMail.setApiKey(sendGridKey);
        
        const mailOptions = {
            from: user,
            to: user,
            subject: "Cascade Error: Deleting Year's children",
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

module.exports = model("years", YearSchema);