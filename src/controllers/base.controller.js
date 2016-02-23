/**
 * Created by ppok on 2/19/2016.
 */

(function (){
    angular.module("appTest")
        .controller("BaseCtrl",
            [
                '$scope',
                '$http',
                function ($scope, $http) {
                    $http.get('testData.json').success(function(response){
                        $scope.testTasks = response;
                    });
                    $scope.currentDate = Date.today();
                    $scope.setDueDateValid = function (isValid) {
                        $scope.isDueDateValid = isValid;
                    };
                }]);
})();