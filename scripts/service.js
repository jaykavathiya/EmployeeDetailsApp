(function () {
    angular.module('app')
        .service("employeeService",['$http','$q',function($http, $q){
            this.employeeData="";
            this.index=-1;
            var deferred = $q.defer();
            $http.get("./mockData/employee.json").then(function(data){
                deferred.resolve(data);
            });
            this.getData = function()
            {
                return deferred.promise;
            }
        }]);
})();