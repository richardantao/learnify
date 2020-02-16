require("dotenv").config();

const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const sgMail = require("@sendgrid/mail");
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const Course = require("./Courses");

const TermSchema = new Schema({
	_id: Schema.Types.ObjectId,
	title: { type: String, required: true },
  	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true }
	},
	meta: {
		createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
}, {
	versionKey: false
});

TermSchema.post("deleteOne", document => {
	const termId = document._id;

	Course.find({ term: termId }, {
		_id: 1
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
	
