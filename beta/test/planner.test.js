process.env.NODE_ENV = "testing";

const mongoose = require("mongoose");
const User = require("../models/User.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Planner", () => {
    beforeEach(done => {
        User.update({  }, {
            $pull: {
                task: {

                }
            }
        }, err => {
            done();
        });
    });
    beforeEach(done => {
        User.update({  }, {
            $pull: {
                assessment: {

                }
            }
        }, err => {
            done();
        });
    });

    describe("/planner", () => {
        // base case
        it("it should trigger a 200 status and fetch the user's tasks and assessments arrays", done => {
            chai.request(server)
            .get("/planner")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(2);        
                
                done();
            });
        });

        // crash case - 404 on tasks
        it("it should trigger a 404 status if the tasks array cannot be found", done => {
            chai.request(server)
            .get("/planner")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("array").with.length(1);        
                done();
            });
        });

        // crash case - 404 on assessments
        it("it should trigger a 404 status if the assessments array cannot be found", done => {
            chai.request(server)
            .get("/planner")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("array").with.length(1);        
                
                done();
            });
        });
    });
    
    describe("/planner/past", () => {
        it("it should trigger a 200 status if the arrays are successfully fetched", done => {
            chai.request(server)
            .get("/planner/past")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(2);

                done();
            });
        });

        // crash case - tasks not found
        it("it should trigger a 404 status if the tasks are not found", done => {
            chai.request(server)
            .get("/planner/past")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("array").with.length(1);

                done();
            });
        });

        // crash case - assessments not found
        it("it should trigger a 404 status if the assessments are not found", done => {
            chai.request(server)
            .get("/planner/past")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("array").with.length(1);

                done();
            });
        });
    });
        
    describe("/planner/tasks/new", () => {
        it("it should trigger a 200 status if the parent options are fetched", done => {
            chai.request(server)
            .get("/planner/tasks/new")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("array");

                done();
            });
        });

        it("it should trigger a 404 status when the parent options", done => {
            chai.request(server)
            .get("/planner/tasks/new")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });
    });
    
    describe("/planner/tasks/create", () => {
        it("it should trigger a 201 status when the new object is posted to the array", done => {
            chai.request(server)
            .post("/planner/tasks/create")
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");

                done();
            });
        });

        it("it should trigger a 422 status if the form fields are invalid", done => {
            chai.request(server)
            .post("/planner/tasks/create")
            .end((err, res) => {
                res.should.have.status(422);
                
                done();
            });
        });
    });
    
    describe("/planner/tasks/edit/:taskId", () => {
        it("it should trigger a 200 status if the object is successfully fetched", done => {
            chai.request(server)
            .get("/planner/tasks/edit/:taskId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                
                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .get("/planner/tasks/edit/:taskId")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
    
    describe("/planner/tasks/update/:taskId", () => {
        it("it should trigger a 200 status if the object is successfully updated", done => {
            chai.request(server)
            .put()
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                
                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .get()
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
    
    describe("/planner/tasks/delete/:taskId", () => {
        it("", done => {
            chai.request(server)
            .delete("planner/tasjs/delete/:taskId")
            .end((err, res) => {
                res.should.have.status(200);
                
                done();
            });
        }); 

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .delete("/planner/tasks/delete/:taskId")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
    
    describe("/planner/assessments/new", () => {
        // base case 
        it("it should trigger a 200 status if the parent options are fetched", done => {
            chai.request(server)
            .get("/planner/assessments/new")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("array");

                done();
            });
        });

        // crash case - parent options not found, throw 404
        it("it should trigger a 404 status when the parent options", done => {
            chai.request(server)
            .get("/planner/assessments/new")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });
    });
    
    describe("/planner/assessments/create", () => {
        it("it should trigger a 201 status when the new object is posted to the array", done => {
            chai.request(server)
            .post("/planner/assessments/create")
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");

                done();
            });
        });

        // crash case - invalid form, choose a random field
        it("it should trigger a 422 status if the form fields are invalid", done => {
            chai.request(server)
            .post("/planner/assessment/create")
            .end((err, res) => {
                res.should.have.status(422);
                
                done();
            });
        });
    });
    
    describe("/planner/assessments/edit/:assessmentId", () => {
        it("it should trigger a 200 status and fetch the object properties with the specified idea", done => {
            chai.request(server)
            .get("/planner/assessments/edit/:assessmentId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");

                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .get("/planner/assessments/edit/:assessmentId")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.length(0);

                done();
            });
        });
    });
    
    describe("/planner/assessments/update/:assessmentId", () => {
        it("it should trigger a 200 status if the object is successfully updated", done => {
            chai.request(server)
            .put("/planner/assessments/update/:assessmentId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                
                done();
            });
        });

        // crash case - assessmentId not found 
        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .put("/planner/assessments/update/:assessmentId")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });

        // crash case - invalid form submission
        it("it should trigger a 422 status if a form field is invalid", done => {
            chai.request(server)
            .put("/planner/assessments/update/:assessmentId")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    });
    
    describe("/planner/assessments/delete/:assessmentId", () => {
        // base case
        it("this should trigger a 200 status if the object is successfully deleted", done => {
            chai.request(server)
            .delete("/planner/assessments/delete/:assessmentId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.length(0);
                
                done();
            });
        });

        // crash case - _id not found
        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .delete("/planner/assessments/delete/:assessmentId")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.length(0);

                done();
            });
        });
    });
});

