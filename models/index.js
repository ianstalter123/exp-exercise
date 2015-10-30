var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/todos-db");

mongoose.set("debug", true);

module.exports.Todo = require("./todo");