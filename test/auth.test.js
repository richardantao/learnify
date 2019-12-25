process.env.NODE_ENV = "testing";

const bcrypt = require("bcryptjs");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Authentication", () => {
    describe("/invite", () => {
        // base crash
        it("it should trigger a 201 status if the form receives acceptable data", done => {
            chai.request(server)
            .post("/invite")
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");

                done();
            });
        });

        // crash case - invalid inputs
        it("it should trigger a 422 status if the form fields are invalid", done => {
            chai.request(server)
            .post("/invite")
            .end((err, res) => {
                res.should.have.status(422);
                
                done();
            });
        });
    });

    describe("/contact", () => {
        it("it should trigger a 201 status and POST the contact message", done => {
            chai.request(server)
            .post("/contact")
            .end((err, res) => {
                res.should.has.status(201);
                
                done();
            });
        });

        it("it should trigger a 422 status if the name field is invalid", done => {
            chai.request(server)
            .post("/contact")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });
    });

    describe("/register", () => {
        // base case
        it("it should trigger a 201 status and POST the new user with successfully hashed password", done => {
            let user = {
                name: {
                    first,
                    last
                }, 
                email,
                password
            };
            
            chai.request(server)
            .post("/register")
            .end((err, res) => {
                res.should.have.status(201);
                
                done();
            });
        });

        // crash case - user submits an invalid email
        it("it should trigger a 422 error and reject the user object", done => {
            let user = {
                name: {
                    first,
                    last
                }, 
                email,
                password
            };

            chai.request(server)
            .post("/register")
            .end((err, res) => {


                done();
            });
        });
    });

    describe("/signin", () => {
        it("it should trigger a 200 status and generate a token and fetch the user's data", done => {
            chai.request(server)
            .post("/signin")
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
        });

        // crash case - 404 
        it("it should trigger a 404 status and reject the user when email is unregistered", done => {
            chai.request(server)
            .post("/signin")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });

        it("it should trigger a 401 status when the password is invalid", done => {
            chai.request(server)
            .post("/signin")
            .end((err, res) => {
                res.should.have.status(401);

                done();
            });
        });
    });
    
    describe("/user", () => {
        // base case
        it("it should fetch the user info and token details", done => {
            chai.request(server)
            .get("/user")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                
                done();
            });
        });

        // crash case - token.id not found 
        it("it should trigger a 404 status if the token details are not found", done => {
            chai.request(server)
            .get("/user")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });

    describe("/signout", () => {
        // base case
        it("it should trigger a 200 status and reset auth state", done => {
            chai.request(server)
            .delete("/signout")
            .end((err, res) => {
                res.should.have.status(200);
                
                done();
            });
        });

        // crash case - 
        it("it should trigger a ???", done => {
            chai.request(server)
            .delete("/signout")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });
    });
});
