(function(){
	angular.module("app",['ngRoute'])
		.config(function($routeProvider) {
			$routeProvider.when("/", {
				templateUrl : "views/home.html",
				controller:	"EmployeeListController"
			});
			$routeProvider.when("/details", {
				templateUrl : "views/details.html",
				controller : "EmployeeDetailController"
			})
		});
})();