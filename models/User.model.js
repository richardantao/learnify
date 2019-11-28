const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const YearSchema = require("./Years.model");
const TermSchema = require("./Terms.model");
const CourseSchema = require("./Courses.model");
const ClassSchema = require("./Classes.model");
const AssessmentSchema = require("./Assessments.model");
const TaskSchema = require("./Tasks.model");
const IntegrationSchema = require("./Integrations.model");

const UserSchema = new Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    email: {
        address: {type: String, required: true, unique: true},
        verified: {type: Boolean, default: false}
    },
    password: {type: String, required: true, minlength: 6},
    year: [YearSchema],
    term: [TermSchema],
    course: [CourseSchema],
    class: [ClassSchema],
    assessment: [AssessmentSchema],
    task: [TaskSchema],
    location: {
    	country: String,
        region: String,
        institution: {type: String, enum: ["University", "College", "High School", "Middle School"]},
        school: String
    },
    preferences: {
        startDay: {type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]},
        startTime: {type: String, default: "8:00am"},
        defaultDuration: {type: Number, default: 50, min: [0, "Default duration must be greater than 0"]},
        defaultCalendar: {type: String, default: "Week", enum: ["Month", "Week", "Day", "Agenda"]},
        onEmailList: {type: Boolean, default: true}
    },
    integration: [IntegrationSchema],
    meta: {
        membership: {type: String, default: "Basic", enum: ["Admin", "Basic", "Beta", "Premium"]},
        sessions: {type: Number, default: 0, min: 0},
        lastActiveAt: {type: Date, default: null},
        createdAt: {type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")},
        updatedAt: {type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")},
        deletedAt: {type: Date, default: null}
	}
});

UserSchema.virtual("/dashboard/class/:id")
.get(() => {
    return '/dashboard/class/' + this._id;
});

module.exports = model("user", UserSchema);