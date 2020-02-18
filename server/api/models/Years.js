const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const async = require("async");
const moment = require("moment");

const Term = require("./Terms");

const YearSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: "users", required: true },
	title: { type: String, required: true },
	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true }
    }
}, {
    versionKey: false
});

// Data Integrity Update
YearSchema.post("updateOne", document => {
    const yearId = document._id;
    const yearStart = moment(document.date.start, "YYYY-MM-DD");
    const yearEnd = moment(document.date.end, "YYYY-MM-DD");

    const findTerms = callback => {
        Term.find({ year: yearId }, {
            _id: 1,
            date: 1
        })
        .then(terms => {
            return callback(null, terms);
        })
        .catch(err => {
            new Error(`Error when finding terms for Year/Terms date integrity: ${err}`);
        });
    };

    const checkStartDates = (dates, callback) => {
        const terms = dates.map(term => {
            if(term.date.start < yearStart) {
                Term.updateOne({ _id: term._id }, {
                    $set: {
                        date: {
                            start: yearStart,
                            end: term.end
                        }
                    }
                })
                .then(term => {
                    return term;
                })
                .catch(err => {
                    new Error(`Error when checking the dates for Year/Terms date integrity: ${err}`);
                });
            } else {
                return term;
            };

            return callback(null, terms);
        });        
    };

    checkEndDates = (dates, callback) => {
        const terms = dates.map(term => {
            if(term.date.end > yearEnd) {
                Term.updateOne({ _id: term._id }, {
                    $set: {
                        date: {
                            start: term.start,
                            end: yearEnd
                        }
                    }
                })
                .then(term => {
                    return term;
                })
                .catch(err => {
                    new Error(`Error when checking the dates for Year/Terms date integrity: ${err}`);
                });
            } else {
                return term;
            };
        });

        return callback(null, terms);
    };  

    async.waterfall([
        findTerms,
        checkStartDates,
        checkEndDates
    ], (err, results) => {
        if(err) {
            new Error(`Error from Years/Terms date integrity: ${err}`);
        } else {
            console.log(results);
        };
    });
});

// Cascade delete
YearSchema.post("deleteOne", document => {
	const yearId = document._id;

	Term.deleteMany({ year: yearId })
	.then(() => {
		console.log(`Term(s) with year(_id) ${yearId} deleted`);
	})
	.catch(err => {
		new Error(`Error from Years cascade delete: ${err}`);
	});
});

module.exports = model("years", YearSchema);