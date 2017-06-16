(function(){
	angular.module("myApp",['ngRoute'])
		.config(function($routeProvider) {
			$routeProvider.when("/", {
				templateUrl : "views/home.html",
				controller:	"myCtrl"
			});
			$routeProvider.when("/details", {
				templateUrl : "views/details.html",
				controller : "myCtrl1"
			})
		});
})();