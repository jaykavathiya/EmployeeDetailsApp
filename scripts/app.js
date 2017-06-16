var app = angular.module("myApp",['ngRoute']);
	app.config(function($routeProvider) {
		$routeProvider.when("/", {
			templateUrl : "views/home.html",
			controller:	"myCtrl"
		});
		$routeProvider.when("/details", {
			templateUrl : "views/details.html",
			controller : "myCtrl1"
		})
	});
	app.service("eService",function($http, $q){
		this.data1="";
		this.index=-1;
		var deferred = $q.defer();
		$http.get("employee.json").then(function(data){
			deferred.resolve(data);
		});
		this.getData = function()
		{
		  return deferred.promise;
		}
	});
	app.controller('myCtrl', function($scope,eService,$location) {
		var promise = eService.getData();
		promise.then(function(data){
			eService.data1 = data.data;
			$scope.data1=eService.data1;
		});
		$scope.removeRow = function (idx) {
			$scope.data1.splice(idx, 1);
		};
		$scope.add = function(){
			$location.path("/details");
			eService.index=-1;
		};
		$scope.edit=function(i){
			$location.path("/details");
			eService.index = i;
		};
	});
	app.controller('myCtrl1',function($scope,eService,$location){

		$scope.user={};
		$scope.add_employee=function(){
			$scope.isclick = false;
			$scope.user.age=calculateAge($scope.user.birth_date);

			if($scope.dform.$valid){
				$location.path("/");
				$scope.employee = angular.copy($scope.user);
				eService.data1.push($scope.employee);
			}
		};

		$scope.update=function(){
			$location.path("/");
			$scope.user.age = calculateAge($scope.user.birth_date);
			eService.data1[eService.index]=angular.copy($scope.user);
		};

		$scope.cancel=function(){
			$location.path("/");
		};

		if(eService.index != -1){
			var bdate=eService.data1[eService.index].birth_date;
			var birth=bdate.split("/");
			$scope.user=angular.copy(eService.data1[eService.index]);
			$scope.user.birth_date = new Date(birth[2],birth[0]-1,birth[1]);
		}
		else{
			$scope.user={};
		}

		var calculateAge= function(birthday) {
			var today=new Date();
			var age=today.getFullYear()-birthday.getFullYear();
			var m = today.getMonth()-birthday.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
				age--;
			}
			return age;
		};
	});