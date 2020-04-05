const { model, Schema } = require("mongoose");

module.exports = model("properties", new Schema({
    _id: Schema.Types.ObjectId,
    parent: String,
    title: { type: String, required: true },
    type: { type: String, required: true }
}, {
    versionKey: false
}));