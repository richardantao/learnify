const { model, Schema } = require("mongoose");

module.exports = model("geodata", new Schema({
    parent: String,
    title: { type: String, required: true },
    type: { type: String, required: true }
}, {
    versionKey: false
}));