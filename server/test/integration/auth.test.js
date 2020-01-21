process.env.NODE_ENV = "testing";



const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Auth Controllers", () => {
    describe("Fetch User Data", () => {
        it("It should retrieve the user's credentials from the user object", done => {
            chai.request(server)
            .get("/api/v1/")
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    res.status.should.be(200);
                    res.body.should.be.a("object");
                    done();
                };
            });
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Register", () => {
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Login", () => { 
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Verify Email", () => {
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Email Verification", () => {
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Resend Email Verification", () => {
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Forgot Password", () => {
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Change Password", () => {
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Reset Password", () => {
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });

    describe("Logout", () => {
        it("", done => {
            
        });

        it("", done => {
            
        });

        it("", done => {
            
        });
    });
});