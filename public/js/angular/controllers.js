app.controller('TodoCtrl', function($scope,$http,Todo) {

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
			var todo = new Todo({name: task})
			todo.$save()
			$scope.task.name = "";
			$scope.todos = Todo.query();
		}
		else {
			$scope.taskError=true;
		}

	}

	$scope.toggleCompleted = function(task){
		$scope.completed = 0;
		task.completed == 'true' ? task.completed = 'false' : task.completed = 'true';
		checkComplete();
		task.$update().then(function(task){
          $scope.todos = Todo.query();
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
			task.$update().then(function(task){
          $scope.todos = Todo.query();
        });
		}
	}

	
})

