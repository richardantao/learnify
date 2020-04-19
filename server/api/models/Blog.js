const { model, Schema } = require("mongoose");

const moment = require("moment");

module.exports = model("blog", new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
	createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") }	
}, {
    versionKey: false
}));
