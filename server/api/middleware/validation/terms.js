const { body, validationResult } = require("express-validator"); 
const async = require("async");
const moment = require("moment");

const Year = require("../../models/Years");
const Term = require("../../models/Terms");

module.exports =  (req, res, next) => {
    const errors = validationResult(req);
    const { year, title, start, end } = req.body;

    const momentStart = moment(start, "YYYY-MM-DD");
    const momentEnd = moment(end, "YYYY-MM-DD");

    body(title, "Title had an invalid input")
        .exists().withMessage("Title is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape();
    
    body(momentStart, "Start date had an invalid input")
        .exists().withMessage("Start date is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape()
        .toDate();
    
    body(momentEnd, "End date had an invalid input")
        .exists().withMessage("End date is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape()
        .toDate();

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else if(momentStart >= momentEnd) {
        return res.status(400).json({ message: "Start date must come before end date" });
    } else {
        async.parallel({
            compareToYear: callback => {
                Year.find({ _id: year }, {
                    _id: 0,
                    date: 1
                })
                .limit(1)
                .then(yearRange => {
                    const yearRangeStart = moment(yearRange[0].date.start, "YYYY-MM-DD");
                    const yearRangeEnd = moment(yearRange[0].date.end, "YYYY-MM-DD");

                    if(yearRangeStart > momentStart || yearRangeEnd < momentEnd) {
                        return res.status(400).json({
                            message: "The start and end date must be inbetween the dates of the year you have selected"
                        });
                    } else {
                        return callback(null);
                    };
                })
                .catch(err => {
                    return res.status(500).json({ message: err.message });
                });
            }, 
            compareToTerms: callback => {
                Term.find({ year }, {
                    _id: 0, 
                    date: 1
                })
                .then(terms => {
                    terms.map(term => {
                        const date = {
                            start: moment(term.date.start, "YYYY-MM-DD"),
                            end: moment(term.date.end, "YYYY-MM-DD")
                        };

                        if(momentStart < date.end && momentStart > date.start || momentEnd < date.end && momentEnd > date.start) {
                            return res.status(400).json({ 
                                message: "This term overlaps with another term. Please ensure every term has a unique time range before continuing"
                            });
                        } else {
                            return date;
                        };
                    });

                    return callback(null);
                })
                .catch(err => {
                    return res.status(500).json({ message: err.message });
                });
            }
        }, err => {
            if(err) {
                return res.status(500).json({ message: err.message });
            } else {
                return next();
            };
        }); 
    };    
};