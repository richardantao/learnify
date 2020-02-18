const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const async = require("async");
const moment = require("moment");

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

OrganizationSchema.post("updateOne", document => {
    const organizationId = document._id;

    
});

OrganizationSchema.post("deleteOne", document => {
    const organizationId = document._id;

    async.parallel({
        groups: callback => {
            Group.find({ organization: organizationId }, {
                _id: 1
            })
            .then(groups => {
                groups.map(({ _id }) => {
                    Group.findOneAndDelete({ _id });
                });
                return callback(null, { groups: true });
            });
        },
        courses: callback => {
            Course.find({ organization: organizationId }, {
                _id: 1
            })
            then(courses => {
                courses.map(({ _id }) => {
                   Course.findOneAndDelete({ _id }) 
                });
                return callback(null, { courses: true });
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

