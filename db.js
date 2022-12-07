const mongoose = require('mongoose');
const serverURI = 'mongodb://0.0.0.0:27017/category';

mongoose.connect(serverURI, {
    useNewUrlParser: "true"
})
mongoose.connection.on("error", err => {
    console.log("Database not connected", err)
})
const conn = mongoose.connection.on("connected", (err, res) => {
    console.log("Database connected")
})

module.exports = conn;