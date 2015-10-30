var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
		name: {type: String,
			   required: true},
		completed: String
});

var Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;

