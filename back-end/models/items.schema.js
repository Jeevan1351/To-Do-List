const mongoose  = require("mongoose")

var itemSchema = new mongoose.Schema({
    title: String,
    priority: String,
    due: String
}, { timestamps: true })

const Item = mongoose.model('Item', itemSchema)
module.exports = {Item}