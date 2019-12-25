const async = require("async");
const multer = require("multer");

// model
const Applicant = require("../models/Applicant");

const controller = [];

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback( null, "client/public/assets/resumes");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage }).single("file");

controller.backend = (req, res) => {
    const { first, last, email, city, help, importance, github, linkedin, other, resume } = req.body;
    
    async.parallel({
        storage: callback => {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else {
                    callback(null, req.file)
                };
            });
        },
        database: callback => {
            Applicant.create({
                name: {
                    first,
                    last
                },
                email,
                city,
                type: "Backend Node Developer",
                help,
                importance,
                github,
                linkedin,
                other,
                resume
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json(results);
        };
    });
};

controller.creator = (req, res) => {
    const { first, last, email, city, knowledge, strategy, importance, resume } = req.body;

    async.parallel({
        storage: callback => {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else {
                    callback(null, req.file)
                };
            });
        }, 
        database: callback => {
            Applicant.create({
                name: {
                    first,
                    last
                },
                email,
                city,
                type: "Content Creator",
                knowledge, 
                strategy, 
                importance,
                resume
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        }
    }, (err, results => {
        if(err) {
            return res.status(500).json({
                message: err.message
            })
        } else {
            return res.status(201).json(results);
        };
    }));
};

controller.designer = (req, res) => {
    const { first, last, email, city } = req.body;
    
    async.parallel({
        storage: callback => {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else {
                    callback(null, req.file)
                };
            });
        }, 
        database: callback => {
            Applicant.create({
                name: {
                    first,
                    last
                },
                email,
                city,
                type: "Visual Designer"
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json(results);
        };
    });
};

controller.frontend = (req, res) => {
    const { first, last, email, city } = req.body;
    
    async.parallel({
        storage: callback => {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else {
                    callback(null, req.file)
                };
            });
        }, 
        database: callback => {
            Applicant.create({
                name: {
                    first,
                    last
                },
                email,
                city,
                type: "Frontend React Developer"
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json(results);
        };
    });
};

controller.marketer = (req, res) => {
    const { first, last, email, city} = req.body;

    async.parallel({
        storage: callback => {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else {
                    callback(null, req.file)
                };
            });
        }, 
        database: callback => {
            Applicant.create({
                name: {
                    first,
                    last
                },
                email,
                city,
                type: "Marketing Specialist"
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json(results);
        };
    });
};

controller.swift= (req, res) => {
    const { first, last, email, city} = req.body;

    async.parallel({
        storage: callback => {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                } else {
                    callback(null, req.file)
                };
            });
        }, 
        database: callback => {
            Applicant.create({
                name: {
                    first,
                    last
                },
                email,
                city,
                type: "Swift Developer"
            })
            .then(applicant => {
                callback(null, applicant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message
            });
        } else {
            return res.status(201).json(results);
        };
    });
};


module.exports = controller;