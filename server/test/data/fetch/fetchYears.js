const ObjectId = require("mongodb").ObjectId;

exports.Years = [
    {
        _id: ObjectId(),
        title: "First Year",
        date: {
            start: "2016-09-05",
            end: "2017-04-30"
        },
        meta: {
            createdAt: "2016-09-05",
            updatedAt: "2016-09-05"
        }
    }, 
    {
        _id: ObjectId(),
        title: "Second Year",
        date: {
            start: "2017-09-07",
            end: "2018-04-26"
        },
        meta: {
            createdAt: "2017-09-07",
            updatedAt: "2017-09-07"
        }
    }, 
    {
        _id: ObjectId(),
        title: "Third Year",
        date: {
            start: "2018-09-05",
            end: "2019-04-29"
        },
        meta: {
            createdAt: "2018-09-05",
            updatedAt: "2018-09-05"
        }
    }, 
    {
        _id: ObjectId(),
        title: "Fourth Year",
        date: {
            start: "2019-09-06",
            end: "2020-04-30"
        },
        meta: {
            createdAt: "2019-09-06",
            updatedAt: "2020-04-30"
        }
    }, 
];