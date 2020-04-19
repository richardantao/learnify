require("dotenv").config();
const { model, Schema } = require("mongoose");

// helpers
const async = require("async");
const moment = require("moment");

// logger
const logger = require("../../config/logger");

// model
const Term = require("./Terms");

const YearSchema = new Schema({
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
            return logger.error(`Error when finding terms for Year-${year}'s post-hook update: ${err}`);
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
                        return logger.info(`Start date of Term-${term._id} has been updated for Year-${year} post-hook update`);
                    })
                    .catch(err => {
                        return logger.error(`Error occurred when updating Terms for Year-${year} post-hook update: ${err}`);
                    });
                } else {
                    return ({ _id, date: { start, end } });
                };
            });
            
            return callback(null, terms);
        };
    };

    const checkEndDates = (terms, callback) => {
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
                        return logger.info(`End date of Term-${term} has been updated from Year-${year} post-hook update`);
                    })
                    .catch(err => {
                        return logger.error(`Error occurred when updating Terms for Year-${year} post-hook update: ${err}`);
                    });
                } else {
                    return ({ _id, date: { start, end } });
                };
            });
    
            return callback(null, `Terms for Year-${year} have been checked and updated`);
        };
    };  

    async.waterfall([
        findTerms,
        checkStartDates,
        checkEndDates
    ], (err, results) => {
        if(err) {
            return logger.error(`Error occurred during Year-${year} post-hook update: ${err}`);
        } else {
            return logger.info(results);
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
                return logger.error(`Error occurred when finding Terms for Year-${year} post-hook delete: ${err}`);
            });
        },
        deleteTerms: (terms, callback) => {
            terms.map(({ _id }) => {
                Term.findOneAndDelete({ _id })
                .then(term => {
                    return logger.info(`Term-${term} belonging to year-${year} deleted`);
                })
                .catch(err => {
                    return logger.error(`Error deleting Terms during Year-${year} post-hook delete: ${err}`);
                });
            });

            return callback(null, `Post-hook delete for year-${year} complete`);
        }
    }, (err, results) => {
        if(err) {
            return logger.error(`Error occured during post-hook delete of Year-${year}: ${err}`);
        } else {
            return logger.info(results);
        };
    });
});

module.exports = model("years", YearSchema);