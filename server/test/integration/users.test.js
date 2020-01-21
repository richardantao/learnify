process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Profile", () => {
    describe("Edit Profile", () => {
        it("It should fetch the user's profile given the user's correct id", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });
    });

    describe("Update Profile", () => {
        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });
    });

    describe("Delete Profile", () => {
        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });
    });
});

describe("Password", () => {
    describe("Edit Password", () => {
        it("It should fetch the user's password to compare given the right credentials", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("It should throw an error if the user isn't authenticated", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });
    });

    describe("Update Password", () => {
        it("It should update the user's password given the right credentials", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("It should throw an error when the passwords don't match", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });
    });
});

describe("Preferences", () => {
    describe("Edit Preferences", () => {
        it("It should fetch the user's preferences given the user's correct id", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });
    });

    describe("Update Preferences", () => {
        it("It should update the user's preferences given the correct data", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });

        it("", done => {
            chai.request(server)
            .get("/api/v1/")
            end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    done();
                };
            });
        });
    });
});

