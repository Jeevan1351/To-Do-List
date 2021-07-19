const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.q4x3f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", (err)=> {
    console.log(err)
})

mongoose.connection.on("open", ()=> {
    console.log("Connected to MongoDB Atlas")
})
