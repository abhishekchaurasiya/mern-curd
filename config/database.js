const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Mongodb is connected!")
    }).catch(error => {
        console.log(error.messge)
        process.exit(1)
    })
};
module.exports = dbConnect;
