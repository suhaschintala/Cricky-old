angular.module('app',[])
.controller('myCtrl',function($scope, $http){
	$http.get('url')
	.success(function(data){
		console.log(data)
	})
	$scope.click = function(data) {
		$http.post('url',{"pi":data}).success(function(rep){$scope.output='hello'});
		
	}
})
