process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Applicant = require("../../../api/models/Applicant");

let chai = require("chai");
let chaiHttp = require('chai-http');
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Team applications", () => {
    it("It should POST the application", done => {

    });

    it("", done => {
        
    });
});