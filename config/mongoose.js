const mongoose =  require('mongoose');

mongoose.connect(`mongodb://localhost:27017/Autentication`);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connection to db:"));

db.once('open', () => {
    console.log('Connected to Mongo DB')
})

module.exports = db;