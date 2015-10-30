var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
		name: String,
		completed:  {type:String, default: false}
});

var Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;