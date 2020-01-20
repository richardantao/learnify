const ObjectId = require("mongodb").ObjectId;

exports.Term = {
    _id: ObjectId(),
    title: "Fall 2019",
    date: {
        start: "2019-09-07",
        end: "2019-12-18"
    }
};

exports.noTitle = {
    _id: ObjectId(),
    title: "",
    date: {
        start: "2019-09-07",
        end: "2019-12-18"
    }
};

exports.noStart = {
    _id: ObjectId(),
    title: "Fall 2019",
    date: {
        start: "",
        end: "2019-12-18"
    }
};

exports.noEnd = {
    _id: ObjectId(),
    title: "Fall 2019",
    date: {
        start: "2019-09-07",
        end: ""
    }
};

