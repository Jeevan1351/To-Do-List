const Items = require("../models/items")

exports.get_list = (req, res) => {
    Items.get_list()
}