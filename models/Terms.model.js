const Schema = require("mongoose").Schema;

const moment = require("moment");

const TermSchema = new Schema({
	_id: Schema.Types.ObjectId,
	year: {type: Schema.Types.ObjectId, required: true, ref: "years"},
	title: {type: String, required: true},
  	date: {
		start: {type: Date, required: true},
		end: {type: Date, required: true}
	},
	meta: {
		createdAt: {type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")},
		updatedAt: {type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")}
	}
});

module.exports = TermSchema;
	
