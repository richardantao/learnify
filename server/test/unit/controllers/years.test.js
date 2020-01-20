process.env.NODE_ENV = "test";

// model
const Year = require("../../../api/models/Years");

// mock data
const correctYear = require("../../data/create/createYear").Year;
const notTitle = require("../../data/create/createYear").noTitle;
const noStart = require("../../data/create/createYear").noStart;
const noEnd = require("../../data/create/createYear").noEnd;

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Years", () => {
    beforeEach(done => {
        Year.remove({}, err => {
            done();
        });
    });
});

describe("Create Year", () => {
    it("It should create a new year given the correct data", done => {
        chai.request(server)
        .post("/v1/api/years")
        .send(correctYear)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            done();
        });
    });

    it("It should throw an error if the title is missing", done => {
        chai.request(server)
        .post("/v1/api/years")
        .send(noTitle)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            done();
        });
    });
    
    it("It should throw an error if the start date is missing", done => {
        chai.request(server)
        .post("/v1/api/years")
        .send(noStart)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            done();
        });
    });

    it("It should throw an error if the end date is missings", done => {
        chai.request(server)
        .post("/v1/api/years")
        .send(noEnd)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            done();
        });
    });

    it("It should throw an error if the start date is greater than the end date", done => {
        chai.request(server)
        .post("/v1/api/years")
        .send(correctYear)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            done();
        });
    });
});

describe("Read Years", () => {
    it("It should fetch all the user's years", done => {
        chai.request(server)
        .get("/v1/api/years")
        .end((err, res) => {
            res.should.have.status(200);

        });
    });
});

describe("Edit Year", () => {
    it("It should fetch the correct", done => {
        chai.request(server)
        .get("/api/v1/years/:yearId")
        .end((err, res) => {
            res.should.have.status(200);
        });
    });
});

describe("Update Year", () => {
    it("It should update the specified year given the correct data", done => {
        chai.request(server)
        .put("/api/v1/years/:yearId")
        .end((err, res) => {
            res.should.have.status(200);
        });
    });
});

describe("Delete Year", () => {
    it("", done => {
        chai.request(server)
        .delete("/api/v1/years/:yearId")
        .end((err, res) => {
            res.should.have.status(200);
        });
    });
});