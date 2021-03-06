app.controller('TodoCtrl', function($scope,$http,Todo) {

	$scope.updateTodos = function () {
		Todo.query( function( data ) {
			$scope.todos = data;
		});
	};

	var checkComplete = function(){
		for(var i = 0; i < $scope.todos.length; i++){
			if($scope.todos[i].completed == 'true'){
				$scope.completed += 1;
			}
		}
	}

	$scope.taskError=false;
	$scope.completed = 0;
	$scope.todos = Todo.query();
	$scope.todos.$promise.then(function () {
		checkComplete();
	});

	for(var i=0; i < $scope.todos.length; i++){
		$scope.todos[i].editBox = false;
	}


	$scope.createTask = function(task){

		if(task){
			$scope.taskError=false;
			console.log(task)

			$http({
				url: "/todos",
				method: "POST",
				data: {name:task.name,completed:'false'},
				headers: {'Content-Type': 'application/json'}})
			.success(function(data) {
				$scope.todos = Todo.query();
				$scope.task.name = "";
			})
			.error(function(data) {
				console.log('Error: ' + data);
				$scope.taskError=true;
			});
		}
		else {
			$scope.taskError=true;
		}

	}

	$scope.toggleCompleted = function(task){
		$scope.completed = 0;
		task.completed == 'true' ? task.completed = 'false' : task.completed = 'true';
		checkComplete();
		task.$update( function() {
			$scope.updateTodos();
		});
		

	}

	$scope.remove = function(task){
		$scope.todos = $scope.todos.filter(function(returnableObjects){
			return returnableObjects._id !== task._id;
		});
		task.$delete();
	}



	$scope.edit = function(index,task){
		console.log('edit time')
		$scope.todos[index].editBox = !$scope.todos[index].editBox;
		if($scope.todos[index].editBox === false){
			console.log('falsed it');
			task.$update( function() {
				$scope.updateTodos();
			});
		}
	}

	
})

