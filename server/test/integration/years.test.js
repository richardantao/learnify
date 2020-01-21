process.env.NODE_ENV = "test";

// model
const Year = require("../../../api/models/Years");

// mock data
const postYear = require("../../data/create/createYear").Year;
const noTitle = require("../../data/create/createYear").noTitle;
const noStart = require("../../data/create/createYear").noStart;
const noEnd = require("../../data/create/createYear").noEnd;

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Year Controllers", () => {
    beforeEach(done => {
        Year.remove({}, err => {
            if(err) {
                throw err;
            } else {
                done();
            };
        });
    });

    describe("Create Year", () => {
        it("It should create a new year given the correct data", done => {
            chai.request(server)
            .post("/v1/api/years")
            .send(postYear)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.should.have.status(201);
                    res.body.should.be.a("object");

                    res.body.should.have.property("message").eql("New year created");
                    res.body.should.have.property("postYear");

                    res.body.postYear.should.have.property("_id").eql(postYear._id);
                    res.body.postYear.should.have.property("user").eql(postYear.user);
                    res.body.postYear.should.have.property("title").eql(postYear.title);
                    
                    res.body.postYear.should.have.property("date");
                    res.body.postYear.date.should.have.property("start").eql(postYear.date.start);
                    res.body.postYear.date.should.have.property("end").eql(postYear.date.end);
                    
                    res.body.postYear.should.have.property("meta");
                    res.body.postYear.meta.should.have.property("createdAt").eql(postYear.meta.createdAt);
                    res.body.postYear.meta.should.have.property("updatedAt").eql(postYear.meta.updateAt);
                
                    done();
                };
            });
        });

        it("It should throw an error if the title is missing", done => {
            chai.request(server)
            .post("/v1/api/years")
            .send(noTitle)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");

                    done();
                };
            });
        });
        
        it("It should throw an error if the start date is missing", done => {
            chai.request(server)
            .post("/v1/api/years")
            .send(noStart)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");

                    done();
                };
            });
        });

        it("It should throw an error if the end date is missings", done => {
            chai.request(server)
            .post("/v1/api/years")
            .send(noEnd)
            .end((err, res) => {
                if(err) {
                  throw err;  
                } else {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
        
                    done();
                };
            });
        });

        it("It should throw an error if the start date is greater than the end date", done => {
            chai.request(server)
            .post("/v1/api/years")
            .send(postYear)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");

                    done();
                };
            });
        });
    });

    describe("Read Years", () => {
        it("It should fetch all the user's years", done => {
            chai.request(server)
            .get("/v1/api/years")
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(4);

                    done();
                };
            });
        });

        it("It should fail to fetch if the user id cannot be retrieved", done => {
            chai.request(server)
            .get("/api/v1/years")
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.status.should.be(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                
                    done();
                };
            });
        }); 
    });

    describe("Edit Year", () => {
        it("It should fetch the correct", done => {
            chai.request(server)
            .get("/api/v1/years/:yearId")
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.should.have.status(200);
                    done();
                };
            });
        });

        it("It should fail to fetch the year if", done => {
            chai.request(server)
            .get("/api/v1/years")
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.status.should.be();
                
                    done();
                };
            });
        });
    });

    describe("Update Year", () => {
        it("It should update the specified year given the correct data", done => {
            chai.request(server)
            .put("/api/v1/years/:yearId")
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.should.have.status(200);
                    done();
                };
            });
        });
    });

    describe("Delete Year", () => {
        it("It should delete the specified year given the correct id", done => {
            chai.request(server)
            .delete("/api/v1/years/:yearId")
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.should.have.status(200);
                    done();
                };
            });
        });
    });
});