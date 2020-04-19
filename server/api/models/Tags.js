const { model, Schema } = require("mongoose");

module.exports = model("tags", new Schema({
    assessment: { type: Schema.Types.ObjectId, required: true, ref: "assessments" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    isResolved: Boolean
}, {
    timestamps: true
}));