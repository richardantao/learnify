const async = require("async");
const moment = require("moment");

// import model
const User = require("../models/User.model").Model;

// instantiate controller
const controller = [];

controller.index = (req, res) => {
    Users.find()
    .then(users => {
        return res.json(users);
    })
    .catch(err => {
        return res.json(err);
    });
}

controller.edit = (req, res) => {
    const { id } = req.params; 

    Users.findById(id)
    .then(userInfo => {
        if(!userInfo) {
            return res.status(404).json({
                message: "User profile was not found with the id " + id
            });
        } else {
            return res.json(userInfo);
        }
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User profile was not found with the id " + id
            });
        } else {
            return res.status(500).json({
                message: "Error retrieving user profile with id " + id
            });
        }
    });
}

controller.create = (req, res) => {
    const { first, last, email, password } = req.body;

    const user = new Users({
        profile: {
            name: {
                first,
                last
            },
            email: {
                address: email
            },
            password: password
        }
    });
    
    user.save()
    .then(newUser => {
        return res.json(newUser);
    })
    .catch(err => {
        console.log("Error occured")
        return res.status(500).json({
            message: err.message || "An error occured while creating your account"
        });
    });
}

controller.update = (req, res) => {
    const { id } = req.params;
    const { first, last, email } = req.body;

    Users.findByIdAndUpdate({
        "_id": id
    }, 
    {
        $set: {
            profile: {
                name: {
                    first,
                    last
                },
                email: {
                    address: email
                }
            },
            meta: {
                updatedAt: Date.now()
            }
        }
    })
    .then(updatedUser => {
        if(!updatedUser) {
            return res.status(404).json({
                message: "The account trying to be updated was not successfully found. Please try again."
            });
        } else {
            return res.json(updatedUser);
        }
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The account trying to be updated was not successfully found. Please try again."
            });                
        } else {
            return res.status(500).json({
                message: err.message || "An error occured while updating user settings"
            });
        }
    })
}

controller.delete = (req, res) => {
    const { _id } = req.params;

    Users.findByIdAndDelete({ _id })
    .then(deletedUser => {
        if(!deletedUser) {
            return res.status(404).json({
                message: "The account trying to be deleted was not successfully found"
            });
        } else {
            return res.json(deletedUser);
        }
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({
                message: "The account trying to be deleted was not successfully found"
            })
        } else {
            return res.status(500).json({
                message: err.message || "An error occured when attempting to delete this account"
            })
        }
    });
}

module.exports = controller;