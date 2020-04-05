const Property = require("../models/Property");

exports.countries = (req, res) => {
    Property.find({ type: "country" })
    .then(countries => {
        return res.status(200).json(countries);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.regions = (req, res) => {
    const { country } = req.params;

    Property.find({ parent: country, type: "region" })
    .then(regions => {
        return res.status(200).json(regions);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.institutions = (req, res) => {
    const { region } = req.params;

    Property.find({ parent: region, type: "institution" })
    .then()
    .catch(err => { 
        return res.status(500).json({ message: err.message }) 
    });
};

exports.schools = (req, res) => {
    const { institution } = req.params;

    Property.find({ parent: institution, type: "school" })
    .then(schools => {
        return res.status(200).json(schools);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};