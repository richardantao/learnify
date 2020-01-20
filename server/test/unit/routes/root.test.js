process.env.NODE_ENV = "test";

const Beta = require("../../../api/models/Beta");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Beta Form", () => {
    it("It should POST a beta invite", done => {
        chai.request(server)
        .post("/invite")
        .end((err, res) => {
            res.should.have.status(201);
            
            done();
        });
    });
});

describe("Contact Form", () => {
    it("It should POST a contact message", done => {
        chai.request(server)
        .post("/contact")
        .end((err, res) => {
            res.should.have.status(200);
            
            done();
        });
    });
});