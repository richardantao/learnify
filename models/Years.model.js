const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const Term = require("./Terms.model");

const YearSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: "users" },
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

YearSchema.post("deleteOne", document => {
	const yearId = document._id;

	Term.find({ year: yearId }, {
		_id: 1
	})
	.then(terms => {
		terms.map(term => {
			Term.findOneAndDelete({ _id: term._id });
		});
	})
	.catch(err => {

	});
});

module.exports = model("years", YearSchema);