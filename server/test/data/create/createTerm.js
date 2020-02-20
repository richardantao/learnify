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

/* Postman */
const firstTerm = {
    "year": "5e4c47b5a29d3caa5a0f0339",
    "title": "Fall 2019",
	"start": "2019-09-07",
	"end": "2019-12-20"
};

const secondTerm = {
    "year": "5e4c47b5a29d3caa5a0f0339",
    "title": "Spring 2020",
	"start": "2020-01-06",
	"end": "2020-04-26"
};

const fakeTerm = {
    "year": "5e4c47b5a29d3caa5a0f0339",
    "title": "Spring Break HAHA",
	"start": "2020-01-06",
	"end": "2020-04-30"
};
