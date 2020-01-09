process.env.NODE_ENV = "testing";

const mongoose = require("mongoose");
const User = require("../models/User.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Academics", () => {
    beforeEach(done => {
        User.update({  }, {
            $pull: {
                year: {

                }
            }
        }, err => {
            done();
        });
    }); 

    beforeEach(done => {
        User.update({  }, {
            $pull: {
                term: {
                    
                }
            }
        }, err => {
            done();
        });
    }); 

    beforeEach(done => {
        User.update({  }, {
            $pull: {
                course: {
                    
                }
            }
        }, err => {
            done();
        });
    }); 

    describe("/academics", () => {
        // base case
        it("it should trigger 200 status if the years, terms, and courses are successfully fetched", done => {
            chai.request(server)
            .get("/academics")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(3);
                
                done();
          });
        });

        // crash case - not found years
        it("it should trigger 404 status if the years array is not found", done => {
            chai.request(server)
            .get("/academics")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("array").with.length(2);
                
                done();
          });
        });

        // crash case - not found terms
        it("it should trigger 404 status if the terms array is not found", done => {
            chai.request(server)
            .get("/academics")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("array").with.length(2);
                
                done();
          });
        });

        // crash case - not found courses
        it("it should trigger 404 status if the courses array is not found", done => {
            chai.request(server)
            .get("/academics")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(2);
                
                done();
          });
        });
    });
    
    describe("/academics/years/new", () => {
        // base case
        it("it should successfully fetch the year modal", done => {
            chai.request(server)
            .get("/academics/years/new")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").with.length(1);
    
                done();
            });
        });
    
        // crash case - not found parents
        it("it should trigger a 404 status if the parent options aren't found", done => {
            chai.request(server)
            .get("/academics/years/new")
            .end((err, res) => {
                res.should.have.status(404);
    
                done();
            }); 
        });
    });
    
    describe("/academics/years/create", () => {
        // base case
        it("it should post object with all the required data", done => {
            chai.request(server)
            .post("/academics/years/create")
            .end((err, res) => {
                
                done();
            });
        });

        // crash case - invalid title input
        it("it should trigger a 422 status if the form is missing a title entry", done => {
            chai.request(server)
            .post("/academics/years/create")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    
        // crash case - missing date input
        it("it should trigger a 422 status if the form is missing a date entry", done => {
            chai.request(server)
            .post("/academics/years/create")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    });

    describe("/academics/years/edit/:yearId", () => {
        // base case
        it("it should fetch the year object with the matched _id", done => {
            chai.request(server)
            .get("/academics/years/edit/:yearId")
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
        });

        // crash case - not found _id
        it("it should trigger a 404 status if the _id is not paired to an object", done => {
            chai.request(server)
            .get("/academics/years/edit/:yearId")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object").with.length(4);

                done();
            });
        });
    });
    
    describe("/academics/years/update/:yearId", () => {
        // base case
        it("it should trigger a 200 status and update the object with the specified _id", done => {
            chai.request(server)
            .put("/academics/years/update/:yearId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.body.be.a("object");
                
                done();
            });
        });

        // crash case - not found _id
        it("it should trigger a 404 status and update the object with the specified _id", done => {
            chai.request(server)
            .put("/academics/years/update/:yearId")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });

        // crash case - invalid input
        it("it should trigger a 422 status if the form receives invalid inputs", done => {
            chai.request(server)
            .put("/academics/years/update/:yearId")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    });
    
    describe("/academics/years/delete/:yearId", () => {
        // base case
        it("it should trigger a 200 status and successfully delete the object from the year array", done => {
            chai.request(server)
            .delete("/academics/years/delete/:yearId")
            .end((err, res) => {
                res.should.have.status(200);
                
                done();
            });
        });
    
        // crash case - objectId err
        it("it should trigger a 404 status if provided with an incorrect _id", done => {
            chai.request(server)
            .delete("/academics/years/delete/:yearId")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        }); 
    
    
        // crash case - plain Not Found
        it("it should trigger a 404 status if other resources are not found", done => {
            chai.request(server)
            .delete("/academics/years/delete/:yearId")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
    
    describe("/academics/terms/new", () => {
        // base case
        it("it should successfully fetch the years for selecting a parent for the new term", done => {
            chai.request(server)
            .get("/academics/terms/new")
            .end((err, res) => {
                res.status.should.be(200);
                res.body.should.be.a("array").with.length(1);
                
                done();
            });
        });
    
        // crash case - parent options not found
        it("it should trigger a 404 error when the parent options are not found", done => {
            chai.request(server)
            .get("/academics/terms/new")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.length(0);
                
                done();
            });
        });
    });
    
    describe("/academics/terms/create", () => {
        it("it should trigger the 201 status and post the new term object", done => {
            chai.request(server)
            .post("/academics/terms/create")
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a("object");
                
                done();
            }); 
        });


    });

    describe("/academics/terms/edit/:termId", () => {
        // base case
        it("it should fetch the term object with the specified _id", done => {
            chai.request(server)
            .get("/academics/terms/edit/:termId")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                
                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .get("/academics/terms/edit/:termId")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });
    });
    
    describe("/academics/terms/update/:termId", () => {
        // base case
        it("it should update the object with the specified _id", done => {
            chai.request(server)
            put("/academics/terms/update/:termId")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                
                done();
            });
        });
    
        // crash case - _id not found
        it("it should trigger a 404 status when the _id isn't found", done => {
            chai.request(server)
            .put("/academics/terms/update/:termId")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                
                done();
            });
        });

        // crash case - invalid inputs
        it("it should trigger a 422 status if the form receives an invalid input", done => {
            chai.request(server)
            .put("/academics/terms/update/:termId")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    });
    
    describe("/academics/terms/delete/:termId", () => {
        // base case
        it("it should trigger a 200 status when the object gets deleted from the array", done => {
            chai.request(server)
            .delete("/academics/terms/delete/:termId")
            .end((err, res) => {
                res.should.have.status(200);
                
                done();
            });
        });

        // crash case - not found
        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .delete("/academics/terms/delete/:termId")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.length(0);
                
                done(); 
            });
        });
    });
    
    describe("/academics/courses/new", () => {
        // base case
        it("it should trigger a 200 status and fetch the term parent options", done => {
            chai.request(server)
            .get("/academics/courses/new")
            .end((err, res) => {
                res.should.have.status(200);
                
                done();
            });
        });

        // crash case - parent options not found
        it("it should trigger a 404 status if the parent options are not found", done => {
            chai.request(server)
            .get("/academics/courses/new")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
    
    describe("/academics/courses/create", () => {
        it("it should trigger a 201 status and POST the new object", done => {
            chai.request(server)
            .post("/academics/courses/create")
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be("object");
                
                done();
            });
        });

        it("it should trigger a 422 status if the form receives an invalid input", done => {
            chai.request(server)
            .post("/academics/courses/create")
            .end((err, res) => {
                res.should.have.status(422);
                                
                done();
            });
        });
    });
    
    describe("/academics/courses/edit/:courseId", () => {
        it("it should trigger a 200 status and fetch the object properties with the specified _id", done => {
            chai.request(server)
            .get("/academics/courses/edit/:courseId")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object").with.length(1);
                
                done();
            });
        });

        it("it should trigger a 404 status if the _id is not found", done => {
            chai.request(server)
            .get("/academics/courses/edit/:courseId")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });

        it("it should trigger a 422 status when the from inputs are invalid", done => {
            chai.request(server)
            .get("/academics/courses/edit/:courseId")
            .end((err, res) => {
                res.should.have.status(422);
                res.should.be.a("object").with.length(1);
                
                done();
            });
        });
    });
    
    describe("/academics/courses/update/:courseId", () => {
        // base case 
        it("it should trigger a 200 status and update the object with the specified _id", done => {
            chai.request(server)
            .put("/academics/courses/update/:courseId")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object").with.length(1);
                
                done();
            });
        });

        // crash case - not found _id
        it("it should trigger a 404 status when the _id is not found", done => {
            chai.request(server)
            .put("/academics/courses/update/:courseId")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                
                done();
            });
        });

        // crash case - invalid input
        it("it should trigger a 422 status and ", done => {
            chai.request(server)
            .put("/academics/courses/update/:courseId")
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");

                done();
            });
        });
    });
    
    describe("/academics/courses/delete/:courseId", () => {
        // base case
        it("it should trigger a 200 status and remove the object from the courses array", done => {
            chai.request(server)
            .delete("/academics/courses/delete/:courseId")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.length(0);
                
                done();
            });
        });

        // crash case - not found _id
        it("it should trigger a 404 status when the _id is not found", done => {
            chai.request(server)
            .delete("/academics/courses/delete/:courseId")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
});




