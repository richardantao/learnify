process.env.NODE_ENV = "testing";

const mongoose = require("mongoose");
const User = require("../../api/models/User");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const should = chai.should();

chai.use(chaiHttp);

