require("dotenv").config();

const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const sgMail = require('@sendgrid/mail');
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const Course = require("./Courses.model");

const TermSchema = new Schema({
	_id: Schema.Types.ObjectId,
	year: { type: Schema.Types.ObjectId, ref: "years", required: true },
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

// all children 
TermSchema.post("deleteOne", document => {
	const termId = document._id;

	Course.find({ term: termId }, { // needs to target both term ids if there are more than 1
		_id
	})
	.then(courses => {
		courses.map(course => {
			if(course.term.length > 1) {
				Course.updateOne({ _id: course._id }, {
					$pull: {
						term: termId
					}
				})
			} else {	
				Course.findOneAndDelete({ _id: course._id })
			};
		});
	})
	.catch(err => {
		sgMail.setApiKey(sendGridKey);
        
        const mailOptions = {
            from: user,
            to: user,
            subject: "Cascade Error: Deleting Term's children",
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

module.exports = model("terms", TermSchema);
	
