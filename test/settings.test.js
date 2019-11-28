process.env.NODE_ENV = "testing";

const mongoose = require("mongoose");
const User = require("../models/User.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Settings", () => {
    describe("/settings/profile", () => {
        // base case
        it("it should trigger a 200 status and fetch the user's profile settings", done => {
            chai.request(server)
            .get("/settings/profile")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object")
                
                done();
            });
        });

        // crash case - not found
        it("it should trigger a 404 status if the user _id cannot be found inside the token", done => {
            chai.request(server)
            .get("/settings/profile")
            .end((err, res) => {
                res.should.have.status(200);
                
                done();
            });
        });
    });

    describe("/settings/profile/update", () => {
        it("it should trigger a 200 status when the profile is successfully updated", done => {
            chai.request(server)
            .put("/settings/profile/update")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                
                done();
            });
        });

        it("it should trigger a 404 status if the user _id cannot be pulled from the token", done => {
            chai.request(server)
            .put("/settings/profile/update")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });

        it("it should trigger a 422 status if the form fields are invalid", done => {
            chai.request(server)
            .put("/settings/profile/update")
            .end((err, res) => {
                res.should.have.status(422);
                
                done();
            });
        });
    });

    describe("/settings/profile/delete", () => {
       it("it should trigger a 200 status if the user account is successfully deleted", done => {
            chai.request(server)
            .delete("/settings/profile/delete")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.length(0);
                
                done();
            });
       });

        it("it should trigger a 404 status if the user id cannot be pulled from the token", done => {
            chai.request(server)
            .delete("/settings/profile/delete")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
       });
    });

    describe("/settings/password", () => {
        it("it should trigger a 200 status if the user's password is successfully fetched and decoded", done => {
            chai.request(server)
            .get("/settings/password")
            .end((err, res) => {
                res.should.have.status(200);
                
                done();
            });
        });

        it("it should trigger a 404 status if the password cannot be successfully fetched", done => {
            chai.request(server)
            .get("/settings/password")
            .end((err, res) => {
                res.should.have.status(404);
                
                done();
            });
        });

        it("it should trigger a xxx status if the hash cannot be decoded", done => {
            chai.request(server)
            .get("/settings/password")
            .end((err, res) => {
                res.should.have.status();
                
                done();
            });
        });
    });

    describe("/settings/password/update", () => {
        // base case 
        it("it should trigger a 200 status if the password is successfully updated", done => {
            chai.request(server)
            .put("/settings/password/update")
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
        });

        // crash case - updated password not found
        it("it should trigger a 404 status if the updated password is not found", done => {
            chai.request(server)
            .put("/settings/password/update")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });

        // crash case - current password incorrect
        it("it should trigger a 422 status if current password field does not match the decoded password in the database", done => {
            chai.request(server)
            .put("/settings/password/update")
            .end((err, res) => {
                res.should.have.status(422);

                done();
            });
        });

        // crash case - new password not valid
        it("it should trigger a 422 status if the new password does not meet constraints", done => {
            chai.request(server)
            .put("/settings/password/update")
            .end((err, res) => {
                res.should.have.status(422);                
                
                done();
            });
        });

        // crash case - new and confirm do not match
        it("it should trigger a 422 status when the new password and the confirmation don't match", done => {
            chai.request(server)
            .put("/settings/password/update")
            .end((err, res) => {
                res.should.have.status(422);                

                done();
            });
        });
    });

    describe("/settings/preferences", () => {
        it("it should trigger a 200 status if the user's preferences are successfully fetched", done => {
            chai.request(server)
            .get("/settings/preferences")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object")

                done();
            });
        });

        it("it should trigger a 404 status if the user's preferences are not found", done => {
            chai.request(server)
            .get("/settings/preferences")
            .end((err, res) => {
                res.should.have.status(404);

                done();
            });
        });
    });

    describe("/settings/preferences/update", () => {
        it("it should trigger a 200 status if the user's preferences are successfully updated", done => {
            chai.request(server)
            .put("/settings/preferences/update")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                
                done();
            });
        });

        it("it should trigger a 404 status if the user's updated preferences are not found", done => {
            chai.request(server)
            .put("/settings/preferences/update")
            .end((err, res) => {
                res.should.have.status(404);
            
                done();
            });
        });

        it("it should trigger a 422 status if the form fields are invalid", done => {
            chai.request(server)
            .put("/settings/preferences/update")
            .end((err, res) => {
                res.should.have.status(422);
        
                done();
            });
        });
    });
});

