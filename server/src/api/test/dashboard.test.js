process.env.NODE_ENV = "testing";

const mongoose = require("mongoose");
const User = require("../models/User.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Dashboard", () => {
    beforeEach(done => {
        User.update({  }, {
            $pull: {
                class: {

                }
            }
        }, err => {
            done();
        });
    });

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

    describe("/dashboard", () => {
        it("it should trigger a 200 status and fetch the classes for today, and the tasks and assessments within the week", done => {
            chai.request(server)
            .get("/dashboard")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(3);
                
                done();
          });
        });
    
        it("it should trigger a 404 status if the classes are not found", done => {
            chai.request(server)
            .get("/dashboard")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(2);
                done();
          });
        }); 
    
        it("it should trigger a 404 status if the tasks are not found", done => {
            chai.request(server)
            .get("/dashboard")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(2);
                
                done();
          });
        });
        
        it("it should trigger a 404 status if the tasks are not found", done => {
            chai.request(server)
            .get("/dashboard")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(2);
                
                done();
          });
        }); 
    });
    
    describe("/dashboard/classes/edit/:classId", () => {
        // base case
        it("it should trigger a 200 status and fetch the object with the specified _id", done => {
            chai.request(server)
            .get("/dashboard/classes/edit/:classId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");

                done();
            });
        });

        it("it should trigger a 404 status if the _id does not match to a class object", done => {
            chai.request(server)
            .get("/dashboard/classes/edit/:classId")
            .end((err, res) => {
                
                
                done();
            }); 
        });
    });
    
    describe("/dashboard/classes/update/:classId", () => {
        // base case
        it("it should trigger a 200 status when the object successfully updates", done => {
            chai.request(server)
            .put("/dashboard/classes/update/:classId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                
                done();
            });
        });

        // crash case - not found _id
        it("it should trigger a 404 status when _id is not found", done => {
            chai.request(server)
            .put("/dashboard/classes/update/:classId")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                
                done(); 
            });
        });

        // crash case - invalid inputs
        it("it should trigger a 422 status when the form receives invalid inputs", done => {
            chai.request(server)
            .put("/dashboard/classes/update/:classId")
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                
                done();
            });
        });
    });
    
    describe("/dashboard/classes/delete/:classId", () => {
        it("it should trigger a 200 status when the object is deleted from the object", done => {
            chai.request(server)
            .delete("/dashboard/classes/delete/:classId")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                
                done();
            });
        });

        it("it should trigger a 404 status when the _id is not found", done => {
            chai.request(server)
            .delete("/dashboard/classes/delete/:classId")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
    
    describe("/dashboard/tasks/new", () => {
        it("it should trigger a 200 status and fetch the parent options", done => {
            chai.request(server)
            .get("/dashboard/tasks/new")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("array");
                
                done();
            });
        });

        it("it should trigger a 404 status if the parent options are not found", done => {
            chai.request(server)
            .get("/dashboard/tasks/new")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
    
    describe("/dashboard/tasks/create", () => {
        it("it should trigger a 201 status and post the object to the tasks array", done => {
            chai.request(server)
            .post("/dashboard/tasks/create")
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");

                done();
            });
        });

        it("it should trigger a 422 status when the from fields are invalid", done => {
            chai.request(server)
            .post("/dashboard/tasks/create")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    });
    
    describe("/dashboard/tasks/update/:taskId", () => {
        it("it should trigger a 200 status when the object successfully updates", done => {
            chai.request(server)
            .put("/dashboard/tasks/update/:taskId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object")

                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .put("/dashboard/tasks/update/:taskId")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });

        it("it should trigger a 422 if the form fields are invalid", done => {
            chai.request(server)
            .put("/dashboard/tasks/update/:taskId")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    });
    
    describe("/dashboard/tasks/delete/:taskId", () => {
        it("it should trigger a 200 status if the object is successfully deleted from the array", done => {
            chai.request(server)
            .delete("/dashboard/tasks/delete/:taskId")
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .delete("/dashboard/tasks/delete/:taskId")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });
    });
    
    describe("/dashboard/assessments/edit/:assessmentId", () => {
        it("it should trigger a 200 status if the object is successfully fetched", done => {
            chai.request(server)
            .get("/dashboard/tasks/edit/:assessmentId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");

                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .get("/dashboard/tasks/edit/:assessmentId")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });
    });
    
    describe("/dashboard/assessments/update/:assessmentId", () => {
        it("it should trigger a 200 status whent he assessment is successfully updated", done => {
            chai.request(server)
            .put("/dashboard/assessments/update/:assessmentId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");

                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .put("/dashboard/assessments/update/:assessmentId")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });

        it("it should trigger a 422 status if the form fields are invalid", done => {
            chai.request(server)
            .put("/dashboard/assessments/update/:assessmentId")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    });
    
    describe("/dashboard/assessments/delete/:assessmentId", () => {
        it("it should trigger a 200 status if the object is successfully deleted from the array", done => {
            chai.request(server)
            .delete("/dashboard/assessments/delete/:assessmentId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.length(0);

                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .delete("/dashboard/assessments/delete/:assessmentId")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });
    });
}); 









