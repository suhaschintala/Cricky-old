angular.module('app',[])
.controller('myCtrl',function($scope, $http){
	$scope.isReg = false;
	$scope.reg = function() {
	/*	$http.post('url',{"name":$scope.name}).success(function(data) {
			$scope.isReg = true;
			console.log(data); //return id 	
		});*/
		$scope.isReg=true;	
	};
	$http.get('url')
	.success(function(data){
		console.log(data)
	});
	$scope.click = function(data) {
		$http.post('url',{"pi":data}).success(function(rep){$scope.output=data.flag;$scope.score=data.score});
		
	};
})
