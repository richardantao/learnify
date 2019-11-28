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
    const dashboard = require("../routes/dashboard.route");
    const calendar = require("../routes/calendar.route");
    const academics = require("../routes/academics.route");
    const planner = require("../routes/planner.route");
    const settings = require("../routes/settings.route"); 

    it("Dashboard route successfully imported", done => {
        should.exist(dashboard);
        done();
    });

    it("Calendar route successfully imported", done => {
        should.exist(calendar);
        done();
    });

    it("Academics route successfully imported", done => {
        should.exist(academics);
        done();
    });

    it("Planner route successfully imported", done => {
        should.exist(planner);
        done();
    });

    it("Settings routes successfully imported", done => {
        should.exist(settings);
        done();
    });
});

describe("Public pages", () => {
    describe("", () => {
        it("Home page rendered OK", done => {
            chai.request("http://localhost:3000/home.html", (err, res, body) => {

                done();
            });
        });
    });
});
