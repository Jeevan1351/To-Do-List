const express = require('express')
const bodyParses = require('body-parser')

const app = express()
require("./routes/item")(app)

const Port = 4500

app.use(bodyParses.urlencoded({extended:true}))

app.get('/', (req, res) =>{
    console.log("Back-end is on!")
    res.json({message: "We are good to go"})
})

app.listen(Port, console.log(`Running on PORT: ${Port}`))
