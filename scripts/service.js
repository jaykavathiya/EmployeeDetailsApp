/**
 * Created by Jay on 6/16/2017.
 */
(function () {
    angular.module('myApp')
        .service("eService",['$http','$q',function($http, $q){
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
        }]);
})();