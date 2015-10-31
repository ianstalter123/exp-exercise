angular.module('TodoApp').factory('Todo', function($resource) {

 return $resource('/todos/:id', 
    { id:'@_id' }, 
    { update: { method: 'PUT'} }
  );
});