const Schema = require("mongoose").Schema; 

const moment = require("moment");

const ClassSchema = new Schema({
    _id: Schema.Types.ObjectId,
    course: {type: Schema.Types.ObjectId, required: true, ref: "courses"},	
    title: {type: String, required: true},
    date: {
        start: {type: Date, required: true},
        end: {type: Date, required: true}
    },
    frequency: {type: String, default: "None", enum:["None", "Daily", "Weekly", "Monthly"]},
    by: Number,
    interval: Number,
    location: String,
    description: String,
    meta: {
	    createdAt: {type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")},
        updatedAt: {type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")}
    }
});

module.exports = ClassSchema;