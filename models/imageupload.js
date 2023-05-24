const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }
}, { timestamps: true });

const file = mongoose.model("File", imageSchema);

module.exports = file;