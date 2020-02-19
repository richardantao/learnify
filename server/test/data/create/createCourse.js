const ObjectId = require("mongodb").ObjectId;

exports.Course = {
    _id: ObjectId(),
	// term: ObjectId(""),
	term: "",
	code: "CBE 3322",
	title: "Heat Transfer Operations",
	credit: 0.5,
	instructor: "Dominic Pjontek",
	theme: "#04D5A6"
};

// POSTMAN
const strategy = {
	"term": "5e4c49deab81e5ab1173d3ed",
	"code": "ES 4481",
	"title": "Entrepreneurial Environment",
	"credit": 0.5,
	"instructor": "Joel Curtis Adams",
	"theme": "#FFFAAA"
};

const macro = {
	"term": "5e4c49deab81e5ab1173d3ed",
	"code": "ECON 1022",
	"title": "Principles of Macroeconomics",
	"credit": 0.5,
	"instructor": "Charles Mao Takongmo",
	"theme": "#D9364E"
};

const capstone = {
	"term": [ "5e4c49a1ab81e5ab1173d3ec", "5e4c49deab81e5ab1173d3ed" ],
	"code": "ES 4499",
	"title": "Integrated Capstone Design Project",
	"credit": 1,
	"instructor": "Darren Meister",
	"theme": "#EDC1C1"
};

const energy = {
	"term": "5e4c49deab81e5ab1173d3ed",
	"code": "CBE 4485",
	"title": "Energy and Society",
	"credit": 0.5,
	"instructor": "Dimitre Karamanev",
	"theme": "#666666"
};

const structuralTheory = {
	"term": "5e4c49deab81e5ab1173d3ed",
	"code": "CEE 2221",
	"title": "Structural Theory and Design",
	"credit": 0.5,
	"instructor": "Wenxing Zhou",
	"theme": "#AA6F73"
};

const compSci = {
	"term": "5e4c49deab81e5ab1173d3ed",
	"code": "CS 1027",
	"title": "CompSci Fundamentals II",
	"credit": 0.5,
	"instructor": "Bryan Sarlo",
	"theme": "#636C51"
};