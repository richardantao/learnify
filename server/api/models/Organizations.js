// database
const { model, Schema } = require("mongoose");

// helpers
const async = require("async");
const moment = require("moment");

// logger
const logger = require("../../config/logger");

// models
const Group = require("./Groups");
const Course = require("./Courses");

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

OrganizationSchema.post("findOneAndUpdate", ({ _id }) => {
    const organization = _id;

    Course.updateMany({ organization }, {

    })
    .then(courses => {
        return callback(
            null,
            `${courses.modifiedCount} groups have been updated upon the update of 
            organizatio-${organization}`
        );
    })
    .catch(err => {
        new Error(err);
    });

    Group.updateMany({ organization }, {

    })
    .then(groups => {
        return callback(
            null,
            `${groups.modifiedCount} groups have been updated upon the update of 
            organizatio-${organization}`
        );
    })
    .catch(err => {
        new Error(err);
    });

    async.parallel([

    ], (err, results) => {
        if(err) {
            new Error(err);
        } else {
            console.log(results);
        }
    });
});

OrganizationSchema.post("findOneAndDelete", ({ _id }) => {
    const organization = _id;

    async.parallel({
        groups: callback => {
            Group.deleteMany({ organization })
            .then(groups => {
                return callback(
                    null,
                    `${groups.deletedCount} groups have been cascade deleted upon the termination
                    of organization-${organization}`
                );
            })
            .catch(err => {
                new Error(err);
            });
        },
        courses: callback => {
            Course.deleteMany({ organization })
            .then(courses => {
                return callback(
                    null,
                    `${courses.deletedCount} groups have been deleted upon the termination
                    of organization-${organization}`
                );
            })
            .catch(err => {
                new Error(err);
            });
        }
    }, (err, results) => {
        if(err) {
            new Error(err);
        } else {
			console.log(`The following documents have been deleted: ${results}`);
        };
    });
});

module.exports = model("organizations", OrganizationSchema);

