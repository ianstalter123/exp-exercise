var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require('method-override'),
morgan = require("morgan")
db = require("./models");


app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({}));

app.get('/', function(req,res){
  res.render('index');
});

var apiRouter = express.Router();

apiRouter.route('/todos')
.post(function(req,res){
  db.Todo.create(req.body,function(error){
    if (error) return res.json({error:error.message})
    res.json({ message: 'Todo created!' });
  console.log(req.body)
  })
})
.get(function(req,res){
  db.Todo.find({},function(error,response){
    res.json(response);
  })
})

apiRouter.route('/todos/:todoId')
.get(function(req,res){
  db.Todo.findById(req.params.todoId,function(error,todo){
    if (error) return res.json({message: "Sorry, there was an error finding that todo!", error: error});
    res.json(todo);
  })
})

.put(function(req,res){
  db.Todo.findById(req.params.todoId,function(error,todo){
    if (error) return res.json({message: "Sorry, there was an error finding that todo!", error: error});
    todo.name = req.body.name
    todo.completed = req.body.completed
    todo.save(function(err){
      if (err) res.send(err);
      res.json({message:'Todo updated!'})
    })
  })
})

.delete(function(req,res){
  db.Todo.remove({_id:req.params.todoId}, function(error,todo){
      if (error) return res.send(error);
      res.json({ message: 'Todo successfully deleted' });
  })
})

app.use('/', apiRouter);

PORT = 3001

app.listen(PORT,function(){
  console.log("this server is running on", PORT)
});