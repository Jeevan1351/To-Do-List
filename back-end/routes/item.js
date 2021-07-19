module.exports = app => {
    const item = require("../controllers/item.controller")

    app.get("/list", item.get_list)

    app.post("/add", item.add_item)
}