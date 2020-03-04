const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

module.exports = model("properties", new Schema({
    _id: Schema.Types.ObjectId,
    parent: String,
    title: { type: String, required: true },
    type: { type: String, required: true }
}, {
    versionKey: false
}));