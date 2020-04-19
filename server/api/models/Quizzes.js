const { model, Schema } = require("mongoose");

module.exports = model("quizzes", new Schema({
    assessment: { type: Schema.Types.ObjectId , required: true, ref: "assessments" },
    questions: { 
        prompt: { type: String, required: true },
        type: { type: String, required: true },
        answer: { type: String, required: true }
    }
}, {
    timestamps: false,
    versionKey: false
}));