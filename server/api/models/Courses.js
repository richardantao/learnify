require("dotenv").config();

const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const sgMail = require('@sendgrid/mail');
const user = process.env.AUTH_EMAIL;
const sendGridKey = process.env.SENDGRID_API_KEY;

const async = require("async");
const moment = require("moment");

const Assessment = require("./Assessments");
const Task = require("./Tasks");
const Class = require("./Classes");

const CourseSchema = new Schema({
	_id: Schema.Types.ObjectId,
	year: { type: Schema.Types.ObjectId, ref: "years", required: true },
	term: [ { type: Schema.Types.ObjectId, ref: "terms", required: true } ],
	code: { type: String, required: true },
	title: { type: String, required: true },
	credit: { type: Number, required: true },
	instructor: String,
	theme: { type: String, default: "#00A6FF" }, 
	meta: {
		createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
		updatedAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }
	}
}, {
	versionKey: false
});

CourseSchema.post("deleteOne", document => {
	const courseId = document._id;

	async.parallel({
		assessments: callback => {
			Assessment.find({ course: courseId }, {
				_id: 1
			})
			.then(assessments => {
				assessments.map(assessment => {
					Assessment.findOneAndDelete({ _id: assessment._id});
				});
				return callback(null, { assessments: true });
			})
		},
		tasks: callback => {
			Task.find({ course: courseId }, {
				_id: 1
			})
			.then(tasks => {
				tasks.map(task => {
					Task.findOneAndDelete({ _id: task._id });
				});
				return callback(null, { tasks: true });
			})
		},
		classes: callback => {
			Class.find({ course: courseId }, {
				_id: 1
			})
			.then(classes => {
				classes.map(classe => {
					Class.findOneAndDelete({ _id: classe._id });
				});
				return callback(null, { classes: true });
			});
		}
	}, (err, results) => {
		if(err) {
			sgMail.setApiKey(sendGridKey);
        
			const mailOptions = {
				from: user,
				to: user,
				subject: "Cascade Error: Deleting Course children",
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
		} else {
			console.log(`The following documents have been deleted: ${results}`);
		};
	});
});

module.exports = model("courses", CourseSchema);
	
