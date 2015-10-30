var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todos-db");

mongoose.set("debug", true);

module.exports.Todo = require("./todo");