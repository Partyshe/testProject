/**
 * Created by ppok on 2/19/2016.
 */

(function (){

    angular.module("appTest")
        .controller("DatePickerCtrl",
            [
                '$scope',
                '$controller',
                function ($scope, $controller) {
                    angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));

                    var changeDateMsg = 'Please enter date more or equal current date.',
                        setDatePickerErrorMsg = function (message){
                            $scope.datePickerErrorMsg = message;
                        };

                    $scope.clear = function () {
                        $scope.date = null;
                    };

                    $scope.setDueDateValid(true);

                    $scope.open = function () {
                        $scope.popup.opened = true;
                        $scope.setDueDateValid(true);
                    };

                    $scope.setDate = function (year, month, day) {
                        $scope.newTask.date = new Date(year, month, day);
                    };

                    $scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };

                    $scope.popup = {
                        opened: false
                    };

                    $scope.validateDtPicker = function(){
                        if(!!$scope.newTask.date && $scope.newTask.date.compareTo($scope.currentDate) >= 0){
                            $scope.setDueDateValid(true);
                            return;
                        }

                        setDatePickerErrorMsg(changeDateMsg);
                        $scope.newTask.date = $scope.currentDate;
                        $scope.setDueDateValid(false);
                    };

                }]);

})();