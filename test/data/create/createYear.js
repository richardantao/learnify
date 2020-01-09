const ObjectId = require("mongodb").ObjectId;

exports.Year = {
    _id: ObjectId(),
    title: "Fourth Year",
    date: {
        start: "2019-09-07",
        end: "2020-04-30"
    }
};

exports.noTitle = {
    _id: ObjectId(),
    title: "", // missing title
    date: {
        start: "2019-09-07",
        end: "2020-04-30"
    }
};

exports.noStart = {
    _id: ObjectId(),
    title: "Fourth Year",
    date: {
        start: "", // empty start date string
        end: "2020-04-30"
    }
};

exports.noEnd = {
    _id: ObjectId(),
    title: "Fourth Year",
    date: {
        start: "2019-09-07",
        end: ""
    }
};