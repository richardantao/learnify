const ObjectId = require("mongodb").ObjectId;

exports.Year = {
    _id: ObjectId(),
    user: ObjectId("5deb33a40039c4286179c4f1"),
    title: "Fourth Year",
    date: {
        start: "2019-09-07",
        end: "2020-04-30"
    }
};

exports.noTitle = {
    _id: ObjectId(),
    user: ObjectId("5deb33a40039c4286179c4f1"),
    title: "", // missing title
    date: {
        start: "2019-09-07",
        end: "2020-04-30"
    }
};

exports.noStart = {
    _id: ObjectId(),
    user: ObjectId("5deb33a40039c4286179c4f1"),
    title: "Fourth Year",
    date: {
        start: "", // empty start date string
        end: "2020-04-30"
    }
};

exports.noEnd = {
    _id: ObjectId(),
    user: ObjectId("5deb33a40039c4286179c4f1"),
    title: "Fourth Year",
    date: {
        start: "2019-09-07",
        end: ""
    }
};