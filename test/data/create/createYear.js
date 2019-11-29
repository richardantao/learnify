export const year = {
    _id: ObjectId(),
    title: "Fourth Year",
    date: {
        start: "2019-09-07",
        end: "2020-04-30"
    }
};

export const noTitle = {
    _id: ObjectId(),
    title: "", // missing title
    date: {
        start: "2019-09-07",
        end: "2020-04-30"
    }
};

export const noStart = {
    _id: ObjectId(),
    title: "Fourth Year",
    date: {
        start: "", // empty start date string
        end: "2020-04-30"
    }
};

export const noEnd = {
    _id: ObjectId(),
    title: "Fourth Year",
    date: {
        start: "2019-09-07",
        end: ""
    }
};