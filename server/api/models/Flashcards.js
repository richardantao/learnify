const { model, Schema } = require("mongoose");

module.exports = model("flashcards", new Schema({
    assessment: { type: Schema.Types.ObjectId , required: true, ref: "assessments" },    
    question: { type: String, required: true },
    answer: { type: String, required: true }
}, {
    timestamps: false,
    versionKey: false
}));