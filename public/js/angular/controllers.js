app.controller('TodoCtrl', function($scope,$http) {

	$scope.taskError=false;
	$scope.isActive = false;

	$http.get('/todos')
	.success(function(data) {
		$scope.todos = data;
		console.log(data)
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	$scope.createTask = function(task){

		if(task){
			$scope.taskError=false;
			console.log(task)
			$scope.todos.push({name:task});
			$scope.task.name = "";

			$http({
				url: "/todos",
				method: "POST",
				data: {name:task},
				headers: {'Content-Type': 'application/json'}})
			.success(function(data) {
				console.log(data)
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
		console.log(task);
		if(task.completed == 'true'){
			task.completed = 'false';
		}else{
			task.completed = 'true';
		}
		
		console.log(task.completed)
		$http({
				url: "/todos/" + task._id,
				method: "PUT",
				data: {completed:task.completed, name:task.name},
				headers: {'Content-Type': 'application/json'}})
			.success(function(data) {
				
				console.log(data)
			})
			.error(function(data) {
				console.log('Error: ' + data);
				$scope.taskError=true;
			});
		}
	

	$scope.remove = function(task){
		 $scope.todos = $scope.todos.filter(function(returnableObjects){
               return returnableObjects._id !== task._id;
        });
		 $http.delete('/todos/' + task._id)
            .success(function (data) {
                console.log(data);
            })
            .error(function (data) {
                console.log(data);
            });
	}
})

