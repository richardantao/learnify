const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const moment = require("moment");

const BetaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    meta: {
        createdAt: { type: Date, default: () => moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm") },
    }
});

module.exports = model("beta", BetaSchema);