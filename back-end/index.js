const express = require('express')
const bodyParses = require('body-parser')

const app = express()

const Port = 4500
app.use(express.json())
app.use(bodyParses.urlencoded({extended:true}))
require("./routes/item")(app)

app.get('/', (req, res) =>{
    console.log("Back-end is on!")
    res.json({message: "We are good to go"})
})

app.post("/test", (req, res)=> {
    console.log(req.body)
    res.send("Successful!")
})

app.listen(Port, console.log(`Running on PORT: ${Port}`))
