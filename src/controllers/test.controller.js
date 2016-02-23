/**
 * Created by ppok on 2/19/2016.
 */

(function (){
    angular.module("appTest")
        .controller("TestCtrl",
            [
                '$scope',
                '$controller',
                testController
            ]);

    function testController ($scope, $controller) {
        angular.extend(this, $controller('BaseCtrl', {$scope: $scope}));

        var hasActualTask = function (expcetedTaskName) {
                var hasTask = false;

                for(task in $scope.testTasks){
                    if($scope.testTasks[task].name === expcetedTaskName){
                        hasTask = true;
                        break;
                    }
                }

                return hasTask;
            },
            setDefaultTask = function () {
                $scope.newTask = {
                    'date': $scope.currentDate
                };
            };

        setDefaultTask();

        $scope.isTaskNameDuplicate = function(taskNameInput){
            if(taskNameInput.$pristine || !taskNameInput.$modelValue){
                return false;
            }

            return hasActualTask(taskNameInput.$modelValue);
        };

        $scope.addTask = function (newTask) {
            $scope.testTasks.push({
                name: newTask.name,
                hours: newTask.hours,
                date: newTask.date.toString("yyyy-MM-dd hh:mm:ss")
            });

            setDefaultTask();

        };

        $scope.clearAll = function () {
            $scope.newTask = {};

            //Clear user's text
            angular.element(document.querySelector('#taskDateInput')).val('');

            $scope.setDueDateValid(true);
        };
    };
})();