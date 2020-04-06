const Geodata = require("../models/Geodata");

exports.countries = (req, res) => {
    Geodata.find({ type: "country" })
    .then(countries => {
        return res.status(200).json(countries);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.regions = (req, res) => {
    const { country } = req.params;

    Geodata.find({ parent: country, type: "region" })
    .then(regions => {
        return res.status(200).json(regions);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.institutions = (req, res) => {
    const { region } = req.params;

    Geodata.find({ parent: region, type: "institution" })
    .then()
    .catch(err => { 
        return res.status(500).json({ message: err.message }) 
    });
};

exports.schools = (req, res) => {
    const { institution } = req.params;

    Geodata.find({ parent: institution, type: "school" })
    .then(schools => {
        return res.status(200).json(schools);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};