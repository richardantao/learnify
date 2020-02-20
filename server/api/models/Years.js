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
YearSchema.post("findOneAndUpdate", ({ _id, date: { start, end } }) => {
    const year = _id;
    const yearStart = moment(start, "YYYY-MM-DD");
    const yearEnd = moment(end, "YYYY-MM-DD");

    const findTerms = callback => {
        Term.find({ year }, {
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

    const checkStartDates = (terms, callback) => {
        if(terms.length === 0) {
            return callback(null, null);
        } else {
            terms.map(({ _id, date: { start, end } }) => {
                if(start < yearStart) {
                    Term.findOneAndUpdate({ _id }, {
                        $set: {
                            date: {
                                start: yearStart,
                                end
                            }
                        }
                    }, {
                        returnNewDocument: true
                    })
                    .then(term => {
                        return term;
                    })
                    .catch(err => {
                        new Error(`Error when checking the dates for Year/Terms date integrity: ${err}`);
                    });
                } else {
                    return ({ _id, date: { start, end } });
                };
            });
            
            return callback(null, terms);
        };
    };

    checkEndDates = (terms, callback) => {
        if(!terms) {
            return callback(null, "No terms to update");
        } else {
            terms.map(({ _id, date: { start, end } }) => {
                if(end > yearEnd) {
                    Term.findOneAndUpdate({ _id }, {
                        $set: {
                            date: {
                                start,
                                end: yearEnd
                            }
                        }
                    }, {
                        returnNewDocument: true
                    })
                    .then(term => {
                        return term;
                    })
                    .catch(err => {
                        new Error(`Error when checking the dates for Year/Terms date integrity: ${err}`);
                    });
                } else {
                    return ({ _id, date: { start, end } });
                };
            });
    
            return callback(null, "Terms checked and updated");
        };
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
YearSchema.post("findOneAndDelete", ({ _id }) => {
    const year = _id;

    async.waterfall({
        findTerms: callback => {
            Term.find({ year })
            .then(terms => {
                return callback(null, terms);
            })
            .catch(err => {
                new Error(err);
            })
        },
        deleteTerms: (terms, callback) => {
            terms.map(({ _id }) => {
                Term.findOneAndDelete({ _id })
                .then(term => {
                    return term;
                })
                .catch(err => {
                    new Error(`Error from Years cascade delete: ${err}`);
                });

                console.log(`Term belonging to year-${year} deleted`);
                return;
            });

            return callback(null, `Cascade delete for year-${year} complete`);
        }
    }, (err, results) => {
        if(err) {
            new Error(err);
        } else {
            console.log(results);
        };
    });
});

module.exports = model("years", YearSchema);