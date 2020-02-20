require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongoDB = process.env.DB_DEV;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    //autoIndex: false, // Don't build indexes
    //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    //poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    //bufferMaxEntries: 0,
    connectTimeoutMS: 10000, 
    socketTimeoutMS: 45000
    // family: 4 // Use IPv4, skip trying IPv6 
}

mongoose.connect(mongoDB, options)
.then(() =>  {
  console.log("Connected to Mongo client");
})
.catch(err => {
  console.error(err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
  console.log("Connecting to database...");
});

module.exports = db;