const mongoose  = require("mongoose")

var itemSchema = new mongoose.Schema({
    title: String,
    priority: String,
    created: String,
    due: String
})

const Item = mongoose.model('Item', itemSchema)
module.exports = {Item}