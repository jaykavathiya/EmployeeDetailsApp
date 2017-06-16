/**
 * Created by Jay on 6/16/2017.
 */
(function () {
    angular.module('app')
        .controller('EmployeeListController', function($scope,employeeService,$location) {
            var promise = employeeService.getData();
            promise.then(function(data){
                employeeService.employeeData = data.data;
                $scope.displayData=employeeService.employeeData;
            });
            $scope.removeRow = function (idx) {
                $scope.displayData.splice(idx, 1);
            };
            $scope.add = function(){
                $location.path("/details");
                employeeService.index = -1;
            };
            $scope.edit=function(i){
                $location.path("/details");
                employeeService.index = i;
            };
        })

        .controller('EmployeeDetailController',function($scope,employeeService,$location){
            $scope.user={};
            $scope.add_employee=function(){
                $scope.isclick = false;
                $scope.user.age=calculateAge($scope.user.birth_date);
                if($scope.dform.$valid){
                    $location.path("/");
                    $scope.employee = angular.copy($scope.user);
                    employeeService.employeeData.push($scope.employee);
                }
            };
            $scope.update=function(){
                $location.path("/");
                $scope.user.age = calculateAge($scope.user.birth_date);
                employeeService.employeeData[employeeService.index]=angular.copy($scope.user);
            };
            $scope.cancel=function(){
                $location.path("/");
            };
            if(employeeService.index != -1){
                var bdate=employeeService.employeeData[employeeService.index].birth_date;
                var birth=bdate.split("/");
                $scope.user=angular.copy(employeeService.employeeData[employeeService.index]);
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
})();