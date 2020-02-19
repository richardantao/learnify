const Schema = require("mongoose").Schema; 
const model = require("mongoose").model;

module.exports = model("classes", new Schema({
    _id: Schema.Types.ObjectId,
	term: [ { type: Schema.Types.ObjectId, ref: "terms", required: true } ],
    course: { type: Schema.Types.ObjectId, ref: "courses", required: true },	
    title: { type: String, required: true },
    date: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    frequency: { type: String, default: "None", enum:[ "None", "Daily", "Weekly", "Monthly" ] },
    by: Number,
    interval: Number,
    location: String,
    description: String
}, {
    versionKey: false
}));