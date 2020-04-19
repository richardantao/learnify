const { model, Schema } = require("mongoose");

module.exports = model("summaries", new Schema({
    assessment: { type: Schema.Types.ObjectId , required: true, ref: "assessments" },
    notes: Array
}, {
    timestamps: false,
    versionKey: false
}));