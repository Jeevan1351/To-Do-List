const {mongoose} = require("../DB/mongoose")
const {Item} = require("../models/items.schema")


exports.get_list = (req, res)=> {
    Item.find().then((items) => {
        res.send(items)
    }).catch((err) => {
        res.status(500).send()
    })
}

exports.add_item = (req, res)=> {
    console.log(req.body)
    const item = new Item(req.body)
    item.save().then((results)=> {
        res.send(results)
    }, (err)=> {
        res.status(400).send(err)
    })
}

exports.del_item = (req, res) => {
    Item.deleteOne(req.body, (err, doc) => {
        if (err) return res.json({success: "false", err})
        return res.json({success: true, doc})
    })
}