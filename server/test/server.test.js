const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("App", () => {

    it("App is correctly defined", done => {
        should.exist(server);
        done();
    });
});

describe("Middleware", () => {
    it("Middleware successfully executed", done => {
        
        done();
    });
});

describe("Application routes", () => {

});

describe("Public pages", () => {
    describe("", () => {
        it("Home page rendered OK", done => {
            chai.request("http://localhost:3000/", (err, res, body) => {

                done();
            });
        });
    });
});
