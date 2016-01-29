angular.module('app',[])
.controller('myCtrl',function($scope, $http){
	$scope.isReg = false;
	$scope.id = 0;
	$scope.gid = 0;
	$scope.reg = function() {
		$http.post('/register',{"name":$scope.name}).success(function(data) {
			$scope.isReg = true;
			$scope.id = data.id; //return id 	
			$http.get('/create').success(function(data){
				$scope.gid = data.number;
				$http.get('/join/'+$scope.name+'/'+$scope.gid).success(function(data){
					$scope.score = data.game.score;
				});
			});
		});
	};
	
	/*$http.get('url')
	.success(function(data){
		console.log(data)
	});*/
	$scope.click = function(data) {
		$http.get('/game/'+$scope.id+'/update/'+data).success(function(rep){$scope.output=rep.flag;$scope.score=rep.score});
		
	};
})
