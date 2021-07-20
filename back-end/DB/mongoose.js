const mongoose = require("mongoose")
// const dotenv = require("dotenv")
// dotenv.config()
// console.log(process.env.DB_USERNAME)
const mongoURI = `mongodb+srv://dbAdmin:ygtongiBBXaGPvg8@cluster0.q4x3f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
/* Export the active connection */
module.exports = { mongoose }